$(function(){
		new ShowCartsData().init();
	})
	
	function ShowCartsData(){
		if(!ShowCartsData.property){
			ShowCartsData.property = {
				userName : (location.search.split("=")[1]).split("&")[0],
				itemList : $(".item_list"),
				goods : [],
				init : function(){
					//显示信息
					this.showGoodsInfo();
					//向后台发送请求，拿到所有的商品数据
					this.getGoods();
				},
				getGoods : function(){
					$.getJSON("detalis.json",function(res){
						//保存所有商品数据
						this.goods = res;
						//在页面显示所有对应商品数据
						this.showGoodsInfo();
//						console.log(this.goods);
						
						//对页面数据进行增删改查
						new SelectEvent().init();
						
					}.bind(this));
				},
				getStorGoods : function(){//从购物车中获取所有要购买的商品信息
					if(localStorage.getItem(this.userName + "goods")){
						var storGoodsStr = localStorage.getItem(this.userName + "goods");
						return JSON.parse(storGoodsStr);
					}else{
						return null;
					}
				},
				showGoodsInfo : function(){//在页面显示所有对应商品数据
					
					if(this.getStorGoods()){
						var cartGoodsInfoJson = this.getStorGoods();
//						console.log(this.goods);
//						console.log(cartGoodsInfoJson);
						var str = "";
						//遍历商品数据和localStorage中的信息
						for (var i = 0; i < this.goods.length; i++) {
							for(var j = 0; j < cartGoodsInfoJson.length; j++){
								//根据匹配的bid找到对应的那个商品的数据
								if(this.goods[i].bid == cartGoodsInfoJson[j].bid){
									str += `
										<div class="item_form">
											<input type="checkbox" class="checkbox" >
											<div class="p_goods">
												<img src="image/${this.goods[i].img0}">
												<p class="p_name">${this.goods[i].location3}</p>
											</div>
											<input class="bid" type="hidden" value="${cartGoodsInfoJson[j].bid}"/>
											<p class="p_prices2">${this.goods[i].klj}</p>
											<div class="p_quantity">
												<span class="a_decrease " href="#">-</span>						                    
							                 	<span class="itxt" href="#">${cartGoodsInfoJson[j].num}</span>
							                    <span class="a_add" href="#">+</span>
											</div>
											<div class="p_sum">
												<strong>￥<em class="goodTotalPrice">${cartGoodsInfoJson[j].num * this.goods[i].klj} </em></strong>
											</div>
											<div class="p_ops">
							                    <span class="car_remove">删除</span>
               								 </div>
									</div>
									`;
								}
							}
						}
//						console.log(str);
						this.itemList.html(str);
					}
				},
			}
		}
		return ShowCartsData.property;
	}
	
	
	
	
	class SelectEvent{
		constructor(){
			this.checkAll = $(".jdcheckbox");//选中所有按钮
			this.deslection = $(".deslection");//取消选择
			this.checkOneBox = $(".checkbox");//
			this.totalCount = $("#sunm");//商品总条数
			this.totalPrice = $("#cartTotal");//商品的总价
			this.computeGoods = new ComputeGoods();//
			this.jian = $(".a_decrease");
			this.add = $(".a_add");
			this.bid = $(".bid");
			this.delCartGoods = $(".car_remove");
			this.pops = $(".p_ops");
		}
		init(){
			this.selectAll();
			this.selectOne();
			this.deslectionAll();
			this.addEvent();
			this.jianEvent();
			this.delGoodsInSelected();
		}
		selectAll(){
			var _this = this;
			this.checkAll.click(function(){
				if($(this).prop("checked")){
					_this.checkOneBox.prop("checked",true);
					$(this).prop("disabled",true);
					_this.deslection.prop("disabled",false);
					_this.deslection.prop("checked",false);
				}
				
				
				//开始计算数量
				var num = _this.computeGoods.computeTotalNum();
				_this.totalCount.html(num);
				//计算总价
				var price = _this.computeGoods.computeTotalPrice();
				_this.totalPrice.html(price);
			})
		}
		selectOne(){
			var _this = this;
			this.checkOneBox.click(function(){
				var checked = false;//表示没有被选中的。
				var unCheck = false;//表示所有的都被选中了。
				_this.checkOneBox.each(function(index,ele){
					if($(ele).prop("checked")){//只要到这里执行，意味最少有一个被选中
						checked = true;
					}else{//只要到这里执行，表示最少有一个未被选中
						unCheck = true;
					}
				});
				if(unCheck){//只要有一个商品未被选中
					//全选按钮要解禁，并且为可选状态
					_this.checkAll.prop("disabled",false);
					_this.checkAll.prop("checked",false);
				}else{//表示所有的都被选中了
					//3只要全部选中，全选按钮变成选中状态，禁止点击
					_this.checkAll.prop("disabled",true);
					_this.checkAll.prop("checked",true);
				}
				if(checked){//2只要有一个被选中
					//取消选择按钮要解禁，并且为可选状态
					_this.deslection.prop("disabled",false);
					_this.deslection.prop("checked",false);
				}else{//表示没有被选中的
					//4没有一个被选中，取消选择按钮是选中状态，并且为禁止点击
					_this.deslection.prop("disabled",true);
					_this.deslection.prop("checked",true);
				}
				var computeNum = _this.computeGoods.computeSelectOneNum();
				var computePrice = _this.computeGoods.computeSelectOnePrice();
				_this.totalCount.html(computeNum);
				_this.totalPrice.html(computePrice);
			});
		}
		deslectionAll(){
			var _this = this;
			this.deslection.click(function(){
				_this.checkOneBox.prop("checked",false);
				//当前的取消选择按钮禁止点击
				$(this).prop("disabled",true);
				//选择所有按钮解除禁止
				_this.checkAll.prop("disabled",false);
				//选择所有按钮取消选中状态
				_this.checkAll.prop("checked",false);
				
				//商品总数量和总价清零
				_this.totalCount.html(0);
				_this.totalPrice.html(0);
			});
		}
		addEvent(){
			var _this = this;
			this.add.click(function(){
				//根据bid作添加操作（加1）
				var bid = $(this).parent().parent().find(".bid").val();
				console.log(bid);
				_this.computeGoods.setNumAndPrice(bid,1);
				
				_this.computeGoods.updateCart()
				var computeNum = _this.computeGoods.computeSelectOneNum();
				var computePrice = _this.computeGoods.computeSelectOnePrice();
				_this.totalCount.html(computeNum);
				_this.totalPrice.html(computePrice);
			});
		}
		jianEvent(){
			var _this = this;
			this.jian.click(function(){
				var bid = $(this).parent().parent().find(".bid").val();
				
				if($(this).parent().parent().find(".itxt").html() > 0){
					_this.computeGoods.setNumAndPrice(bid,-1);
				}else{//当减到0时，作删除操作
					//删除当前节点
					$(this).parent().parent().remove();
					//删除购物车中的一条信息
					_this.computeGoods.delGoodByBid(bid);
				}
				_this.computeGoods.updateCart()
				
				var computeNum = _this.computeGoods.computeSelectOneNum();
				var computePrice = _this.computeGoods.computeSelectOnePrice();
				_this.totalCount.html(computeNum);
				_this.totalPrice.html(computePrice);
			});
		}
		delGoodsInSelected(){
			var _this = this;
//			console.log(this.delCartGoods.length)
			for (var i = 0; i < this.delCartGoods.length; i++) {
				this.delCartGoods.eq(i).click(function(){
					$(this).parent().parent().remove();
					var bid = $(this).parent().parent().find(".bid").val();
					console.log(bid);
					_this.computeGoods.delGoodByBid(bid);
					
					_this.checkOneBox.each(function(index,ele){
					if($(ele).prop("checked")){
						var computeNum = _this.computeGoods.computeSelectOneNum();
						var computePrice = _this.computeGoods.computeSelectOnePrice();
						_this.totalCount.html(computeNum);
						_this.totalPrice.html(computePrice);
					}
				});
					
				})
			}
			
			
			
			
		}

	}



	class ComputeGoods{
		constructor(){
			this.checkOneBox = $(".checkbox");
			this.goodNum = $(".itxt");
			this.item_list = $(".item_list");
			this.goodPrice = $(".p_prices2");
			this.goodTotalPrice = $(".goodTotalPrice");
			this.goodBid = $(".bid");
			this.goodUl = $(".item_list").find(".item_form");
			this.storGoodsJson = new ShowCartsData().getStorGoods();
			this.userName = new ShowCartsData().userName;
		}
		computeTotalNum(){
			var num = 0;
			var gNum = this.item_list.find(".itxt");
			gNum.each(function(index,ele){
				num += Number($(ele).html());
			})
			return num;
		}
		computeTotalPrice(){
			var price = 0;
			var _this = this;
			this.goodTotalPrice.each(function(index,ele){
				price += Number($(ele).html());
			})
			return price;
		}	
		computeSelectOneNum(){//根据选择时产生的bid对应的计算条数
			var tNum = 0;
			var gNum = this.item_list.find(".checkbox");
			gNum.each(function(index,ele){
				console.log($(ele).prop("checked"))
				if($(ele).prop("checked")){
					tNum += Number($(ele).parent().find(".itxt").html());
				}
			});
			return tNum;
		}
		computeSelectOnePrice(){//根据选择时产生的bid对应的计算条数
			var tPrice = 0;
			var gNum = this.item_list.find(".checkbox");
			gNum.each(function(index,ele){
				if($(ele).prop("checked")){
					tPrice += Number($(ele).parent().find(".goodTotalPrice").html());
				}
			});
			return tPrice;
		}
		setNumAndPrice(bid,num){//
			var _this = this;
			this.goodUl.each(function(index,ele){
				console.log(index)
				if($(ele).find(".bid").val() == bid){
					//var gNum = Number($(ele).parent().parent().find(".goodNum").html());
					var gNum = Number(_this.goodNum.eq(index).html());
					_this.goodNum.eq(index).html(gNum+num);
					var gPrice = _this.goodNum.eq(index).html() * _this.goodPrice.eq(index).html();
					_this.goodTotalPrice.eq(index).html(gPrice);
					
					//在原购物车中的对应bid的数量加num
					_this.storGoodsJson[index].num += num; 
					//更新购物车
					_this.updateCart();
				};
			})
		}
		updateCart(){
			var storGoodsStr = JSON.stringify(this.storGoodsJson);
			localStorage.setItem(this.userName+"goods",storGoodsStr);
		}
		delGoodByBid(bid){
			//删除this.storGoodsJson中对应bid的这一条信息
			for (var i = 0; i < this.storGoodsJson.length; i++) {
				if(this.storGoodsJson[i].bid == bid){
					this.storGoodsJson.splice(i,1);
					this.updateCart();
					break;
				}
			}
			//更新购物车updateCart();
		}
		
	}