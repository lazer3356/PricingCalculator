$(document).ready(function(){	
			function round_zero_decimal_digits(num1){
				return Math.round(parseFloat(num1)) ;
			}
			function round_2_digits(num1){
				return Math.round( parseFloat(num1) * 100 ) / 100;
			}
			function numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			
			function group_price_calculate(opt,multiplier,markup,surcharge,input_price){
				let cost_price = 0;
				let retail_price = 0;
				if( opt == "C"){
					cost_price = round_2_digits( input_price * surcharge );
					retail_price = round_2_digits( cost_price * markup  ) ;
				}else{
					cost_price = round_2_digits( input_price * surcharge * multiplier);
					retail_price = round_2_digits( cost_price * markup  ) ;
				}
				
				return [cost_price,retail_price];
				
			}
			
			var Alphabet_Array = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
			let newfield = '';
			var priceFieldHtml = '<div class="row input_field">' + 
					'<div class="col-md-5">' + 
						'<label>' + 
							'Group B' + 
						'</label>' + 
						'<div class="input_field_n_dollar">' + 
							'<input type="text" id="" class="number_req form-control description" name ="" value=""/>' + 
						'</div>' + 
					'</div>' + 
					'<div class="col-md-3">' + 
						'<label>' + 
							'Price' + 
						'</label>' + 
						'<div class="input_field_n_dollar">' + 
							'<span class="dollar_sign"> $ </span>' + 
							'<input type="text" id="" class="number_req form-control list_price" name ="" value=""/>' + 
						'</div>' + 	
					'</div>' + 
					'<div class="col-md-1"> <label>&nbsp;</label> <button type="button" class="minus"> - </button></div>' + 
				'</div>';
				
				function priceField(num1){
					
					return '<div class="row input_field">' + 
					'<div class="col-md-5">' + 
						'<label>' + 
							'Group ' + Alphabet_Array[num1] + 
						'</label>' + 
						'<div class="input_field_n_dollar">' + 
							'<input type="text" id="" class="number_req form-control description" name ="" value="Cabinets"/>' + 
						'</div>' + 
					'</div>' +		

					'<div class="col-md-3">' +
							'<label>' +
								'&nbsp;' +
							'</label>' +
							'<div class="flex_subdiv">' +
								'<label class="btn btn-secondary btn_l_c active" for="option1" >' +
									'<input type="radio" class="btn-check list_price_option" name="list_price_options' + num1  + '" autocomplete="off" value="L" checked="checked" />' +
									'L' +
								'</label>' +
								
							   '<label class="btn btn-secondary btn_l_c " for="option2">' +
									'<input type="radio" class="btn-check list_price_option" name="list_price_options' + num1  + '" autocomplete="off" value="C" />' +
									'C' +
								'</label>' +

								
							'</div>' +
						'</div>' +
					
					'<div class="col-md-3">' + 
						'<label>' + 
							'Price' + 
						'</label>' + 
						'<div class="input_field_n_dollar">' + 
							'<span class="dollar_sign"> $ </span>' + 
							'<input type="text" id="" class="number_req form-control list_price" name ="" value=""/>' + 
						'</div>' + 	
					'</div>' + 
					'<div class="col-md-3 modification">' +
						'<label>' +
							'Modification' +
						'</label>' +
						'<div class="input_field_n_dollar">' +
							'<span class="dollar_sign"> $ </span>' +
							'<input type="text" id="list_price_m1" class="number_req form-control list_price_m" name ="list_price_m1" value=""/>' +
						'</div>	' +
					'</div>' +	
					'<div class="col-md-1"> <label>&nbsp;</label> <button type="button" class="minus"> - </button></div>' + 
				'</div>';
					
				}
				
				
				function specialityItem(sp_num1){
					
					return '<div class="row input_field speciality_item_fields">' +
						'<div class="col-md-5">' +
							'<label>' +
								'Speciality Items ( Cost)' +
							'</label>' +
							'<div class="input_field_n_dollar">' +
								'<input type="text" id="speciality_item_1" class="number_req form-control speciality_item" name ="speciality_item_1" value="Cabinets"/>' +
							'</div>	' +
						'</div>' +
						'<div class="col-md-3">' +
							'<label>' +
								'Price' +
							'</label>' +
							'<div class="input_field_n_dollar">' +
								'<span class="dollar_sign"> $ </span>' +
								'<input type="text" id="speciality_item_1" class="number_req form-control speciality_item_price" name ="speciality_item_price_1" value=""/>' +
							'</div>	' +
						'</div>' +
						'<div class="col-md-1"> <label>&nbsp;</label> <button type="button" class="btn_minus speciality_item_minus"> - </button></div>' + 
					'</div>';
					
				}
				
				function accessories_dropdown(ac_d_num1){
					return '<div class="row input_field speciality_item_fields">' +
						'<div class="col-md-2">' +
							'<label>' +
								'Quantity' +
							'</label>' +
							'<div class="input_field_n_dollar">' +
								'<input type="number" id="acessories_qty_1" class="number_req form-control acessories_qty" name ="acessories_qty_1" value="1"/>' +
							'</div>	' +
						'</div>' +
						'<div class="col-md-9">' +
							'<label>' +
								'<span class="red"> &nbsp </span>' +
							'</label>' +
							'<select id="acessories_dropdown" name ="acessories_dropdown" required="required" class="acessories_dropdown_list">' +
								'<option name="" value="">Please Select Acessory</option>' +
								'<option name="" value="171.70" data-list-price="401.64" data-cost-price="" data-retail_percent="15" data-model="502.56.842"> Trash Pullout - double 52 qt (champagne) </option>' +
								'<option name="" value="174.44" data-list-price="408.05" data-cost-price="" data-retail_percent="15" data-model="502.56.942" > Trash Pullout - double 52 qt (grey) </option>' +
								'<option name="" value="189.36" data-list-price="442.94" data-cost-price="" data-retail_percent="15" data-model="502.56.242"> Trash Pullout - double 52 qt (white) </option>' +
								'<option name="" value="148.00" data-list-price="346.20" data-cost-price="" data-retail_percent="15" data-model="502.56.840"> Trash Pullout - double 36 qt (champagne) </option>' +
								'<option name="" value="148.00" data-list-price="346.20" data-cost-price="" data-retail_percent="15" data-model="502.56.940"> Trash Pullout - double 36 qt (grey) </option>' +
								'<option name="" value="153.24" data-list-price="358.46" data-cost-price="" data-retail_percent="15" data-model="502.56.240"> Trash Pullout - double 36 qt (white) </option>' +
								'<option name="" value="92.48" data-list-price="216.34" data-cost-price="" data-retail_percent="25" data-model="556.99.117"> Spice Tray Insert (23.5" - birch) </option>' +
								'<option name="" value="75.22" data-list-price="175.94" data-cost-price="" data-retail_percent="25" data-model="556.99.114"> Spice Tray Insert (15.25" - birch) </option>	' +													
								'<option name="" value="78.09" data-list-price="182.66" data-cost-price="" data-retail_percent="20" data-model="556.99.107" > Cutlery Divider Insert (23.5" - birch) </option>' +
								
								'<option name="" value="64.20" data-list-price="150.17" data-cost-price="" data-retail_percent="20" data-model="556.99.104"> Cutlery Divider Insert (15.25" - birch) </option>' +
								
								'<option name="" value="126.92" data-list-price="296.90" data-cost-price="" data-retail_percent="15" data-model="545.48.239"> Undersink Wire Pullout</option>' +
								
								'<option name="" value="190.92" data-list-price="318.19" data-cost-price="" data-retail_percent="10" data-model="515.02.140"> Undersink Removable Sliding Baskets</option>' +
								
								'<option name="" value="86.52" data-list-price="141.78" data-cost-price="" data-retail_percent="25" data-model="54410C1"> Undersink Cleaning Caddy</option>' +
								
								'<option name="" value="223.92" data-list-price="523.78" data-cost-price="" data-retail_percent="20" data-model="502.72.705"> Hamper - 2 x 35 qt (Hailo 600mm) </option>' +
								
								'<option name="" value="216.92" data-list-price="507.42" data-cost-price="" data-retail_percent="20" data-model="502.72.722"> Hamper - 2 x 35 qt (Hailo 450mm) </option>' +
								
							'</select>	' +
						'</div>' +
						'<div class="col-md-1"><label>&nbsp;</label><button type="button" class="btn_minus acessories_minus"> - </button></div>' +
					'</div>';
				}
			
			$("#priceCalcForm").validate({
			  rules: {
				// simple rule, converted to {required:true}
				list_price_a: {
					required: true,
					number: true,
					min: 1,
					max: 9999999
				},
				main_unit: {
					required: true,
				},
				
			  }
			});
			
			jQuery('.modification').hide();
			
			/*
			jQuery('#main_unit').change(function() {
				var eventTypeName = $("#main_unit option:selected");

				if (eventTypeName.is('[name="CNG"]') ) {
					jQuery('.modification').show();
				}else{
					jQuery('.modification').hide();
				}

			});
			*/
			
			var num1 = 0;
			var sp_num1 = 0;
			ac_d_num1 = 0;
			
			jQuery("#priceCalcForm").on("click",".btn_l_c", function(){
				if(jQuery(this).find('input[type="radio"]').hasClass('neutral')) {
					e.preventDefault();
				}
				jQuery(this).parent().find( ".btn_l_c" ).removeClass('active');
				jQuery(this).parent().find('input[type="radio"]').attr("checked",false);
				jQuery(this).addClass('active');
				jQuery( this ).find('input[type="radio"]').attr("checked",true);
				//console.log( jQuery(this).val() );
				console.log( $(this).find('input[type="radio"]').filter(':checked').val() );
				//console.log($(this).find('input[type="radio"]').val());	
			});
			
			
			jQuery( ".plus" ).click(function( event ){
				event.preventDefault();
				if (num1 <= 50){
					num1 = num1 + 1;
					newfield = priceField(num1);
					$(this).parent().parent().parent().append(newfield);
				}

			});

			jQuery("#priceCalcForm").on("click",".minus", function(){
				jQuery(this).parent().parent().remove();
				num1 = num1 - 1;
			});
			
			
			jQuery( ".speciality_item_plus" ).click(function( event ){
				event.preventDefault();
				if (sp_num1 <= 50){
					sp_num1 = sp_num1 + 1;
					newfield_specialityItem = specialityItem(sp_num1);
					$(this).parent().parent().parent().append(newfield_specialityItem);
				}
			});

			jQuery("#priceCalcForm").on("click",".speciality_item_minus", function(){
				jQuery(this).parent().parent().remove();
				sp_num1 = sp_num1 - 1;
			});
			
			jQuery( ".acessories_plus" ).click(function( event ){
				event.preventDefault();
				if (ac_d_num1 <= 50){
					ac_d_num1 = ac_d_num1 + 1;
					newfield_accessories_dropdown = accessories_dropdown(ac_d_num1);
					$(this).parent().parent().parent().append(newfield_accessories_dropdown);
				}
			});

			jQuery("#priceCalcForm").on("click",".acessories_minus", function(){
				jQuery(this).parent().parent().remove();
				ac_d_num1 = ac_d_num1 - 1;
			});
			
				
			jQuery( "#price_calc_btn" ).click(function( event ){

				event.preventDefault();
				
				jQuery("#input_data_table_1, #input_data_table_2, #input_data_table_3, #input_data_table_4, #input_data_table_5, .table_print_1, .br_line").remove();
				
				var validator = $( "#priceCalcForm" ).validate();
					if( ! validator.form() ){
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
						return;

					} 

				let price = 0;
				let totalCost = 0;
				let clientPrice = 0;
				let listprice = 0;
				let modificationprice = 0;
				var price_func_arr = [];
				
				var priceInput_Array = [];
				
				let name = jQuery('#main_name').val();
				let projectName = jQuery('#project_name').val();
				
				let vendor = Number( jQuery('#main_unit').val() );
				let upCharge = Number( jQuery('#main_unit option:selected').attr('data-upcharge') )/100;
				
				let vendorSurcharge = jQuery('#main_unit option:selected').attr('data-upcharge') ? Number( $('#main_unit option:selected').attr('data-surcharge') ) : 0;
				
				let discount =  jQuery('#discount').val() ? Number( $('#discount').val() )/100 : 0;
				
				let shipping =  jQuery('#shipping').val() ? Number( $('#shipping').val() ) : 0;
				let surcharge =  jQuery('#surcharge').val() ? Number( $('#surcharge').val() ) : 0;
				
				let shipping_part =   Number( shipping ); // Number( shipping ) / jQuery('.list_price').length ;
				
				if( jQuery('.list_price').length > 1){
					shipping_part =  Number( shipping ) / 2;
				}
				
				
				
				
				let print_project_info = '<table id="input_data_table_2" class="table_print_pdf"> ' + 
										'<tr><td class=""> Name : ' + name +  ' </td></tr>' + 
										'<tr><td class=""> Project Name : ' + projectName +  ' </td></tr>' +  
										'</table><div class="br_line"><br/></div>';
				
				let print_cost_table = '<table id="input_data_table_3" class="table_print_pdf"> ' + 
											'<tr>' + 
												'<td> </td>' +
												'<td>Retail</td>' +
												'<td>List</td>' +
												'<td>Cost</td>' +
											'</tr>';
											
				let print_input_data = '<table id="input_data_table_4" class="table_print_pdf">';
				
				
				let print_ind_data = '';
				
				let print_cost_table_sub = '';
				
				
				let cnt1 = 0;
				let modificationtotalPrice = 0;
				
				$('.list_price').each(function () {
					
					var opt_l_c = jQuery(this).parent().parent().parent().find('.list_price_option:checked').val();
					
					//modificationprice = Number ( jQuery('.list_price_m ').eq(cnt1).val() );
					//modificationtotalPrice += modificationprice;
					modificationprice = 0;
					price = Number( $(this).val() );
					console.log(listprice);
					if( opt_l_c == "L" ){
						listprice = listprice + price;
						var LP_check = '$ ' + numberWithCommas( Number( $(this).val() ) );
						
					}else{
						var LP_check = "N/A";
						listprice = listprice;
					}
					console.log(listprice);
					//price = price + ( Number( $(this).val() ) * Number(vendorSurcharge) );
					//price = round_2_digits( ( price * Number(vendor) ) ) ;
					
					
					//console.log(opt_l_c);
					//console.log(upCharge);
					//console.log(vendor);
					//console.log(vendorSurcharge);
					//console.log($(this).val());
					// upcharge =>markup
					//group_price_calculate(opt,multiplier,markup,surcharge,input_price)
					price_func_arr = group_price_calculate(opt_l_c,Number(vendor),Number(upCharge),Number(vendorSurcharge),Number($(this).val()));
					
					console.log(price_func_arr);
					
					price = Number( price_func_arr[0] );
					console.log(price);
					clientPrice +=  Number( price_func_arr[1] ) - Number( price_func_arr[1] ) * discount;
					totalCost += price;
					console.log(clientPrice);
					//clientPrice += round_2_digits( price + (price * upCharge)  - (( price + (price * upCharge) ) * discount) );
					
					//print_ind_data += '<tr><td>' + $(this).parent().parent().parent().find('.description').val() + ' </td>';
					//print_ind_data += '<td> $ ' + numberWithCommas( Number(price) ) + ' </td></tr>';
					
					
					print_cost_table_sub +=  '<tr>' + 
												'<td>' + $(this).parent().parent().parent().find('.description').val() + ' </td>' +
												'<td> $' + numberWithCommas( round_2_digits( Number( price_func_arr[1] ) - Number( price_func_arr[1] ) * discount + shipping_part + modificationprice ) ) + ' </td>' +
												'<td> ' + LP_check + ' </td>' +
												'<td> $' + numberWithCommas( round_2_digits(price + shipping_part + modificationprice) ) + ' </td>' +
											'</tr>';
					
					cnt1++;

					shipping_part = cnt1 > 1 ? 0 : 	shipping_part;
					
				});
				
				
				$('.speciality_item_price').each(function () {
					
					if( jQuery(this).val() ) 
					{
					
						var speciality_item_cost_price = round_2_digits(  Number( jQuery(this).val() ) );
						var speciality_item_retail_price = round_2_digits(  speciality_item_cost_price * upCharge );
						
						
						//listprice = listprice + acessory_list_price;
						totalCost += speciality_item_cost_price;
						clientPrice += speciality_item_retail_price;
						
						//console.log(acessory_cost_price);
						//console.log(acessory_list_price);
						//console.log(acessory_retail_percent);
						
						
						print_cost_table_sub +=  '<tr>' + 
													'<td> Speciality item : ' + $(this).parent().parent().parent().find('.speciality_item').val()  + ' </td>' +
													'<td> $' + speciality_item_retail_price + ' </td>' +
													'<td> N/A </td>' +
													'<td> $' + speciality_item_cost_price + ' </td>' +
												'</tr>';
					}
				});
				
				
				
				let print_acessory_table_header = '';
				let print_acessories_data = '';
				let print_acessory_table_sub = '';				
				
				var acessory_list_price_total = 0;
				var acessory_cost_price_total = 0;
				var acessory_retail_price_total = 0;
				
				
				
				$('.acessories_dropdown_list').each(function () {
					
					if( jQuery(this).val() ) 
					{
					
						var qty = round_2_digits( jQuery(this).parent().parent().find('.acessories_qty').val() );
						//console.log(qty);
						var acessory_cost_price = jQuery(this).val() ? round_2_digits( Number( jQuery(this).val() ) * qty ) : 0;
						var acessory_list_price = jQuery(this).val() ? round_2_digits( Number( jQuery(this).find('option:selected').attr('data-list-price') ) * qty ) : 0;
						var acessory_retail_percent = jQuery(this).val() ? round_2_digits( Number( jQuery(this).find('option:selected').attr('data-retail_percent') ) ) : 0;
						
						var acessory_retail_price = jQuery(this).val() ? round_2_digits( acessory_list_price * (1 - (acessory_retail_percent/100)) ) : 0;
						/*
						console.log(qty);
						console.log(acessory_cost_price);
						console.log(acessory_list_price);
						console.log(acessory_retail_percent);
						console.log(acessory_retail_price);
						*/
						listprice = round_2_digits( listprice + acessory_list_price   );
						totalCost += round_2_digits( acessory_cost_price  );
						clientPrice += round_2_digits( acessory_retail_price );
						
						
						acessory_retail_price_total += acessory_retail_price;
						acessory_list_price_total += acessory_list_price;
						acessory_cost_price_total += acessory_cost_price;
						
						
						//console.log(acessory_cost_price);
						//console.log(acessory_list_price);
						//console.log(acessory_retail_percent);
						
						
						print_acessory_table_sub +=  '<tr>' + 
													'<td>' + $(this).find('option:selected').text() + ' )</td>' +
													'<td> ' + qty + ' </td>' +
													//'<td> $' + numberWithCommas( acessory_retail_price ) + ' </td>' +
													//'<td> $' + numberWithCommas( acessory_list_price  ) + ' </td>' +
													//'<td> $' + numberWithCommas( acessory_cost_price ) + ' </td>' +
												'</tr>';
					}
				
				});
				
				
				if( jQuery('.acessories_dropdown_list').val() ) 
				{
					
					print_cost_table_sub +=  '<tr>' + 
													'<td> Acessories </td>' +
													'<td> $' + numberWithCommas( acessory_retail_price_total ) + ' </td>' +
													'<td> $' + numberWithCommas( acessory_list_price_total  ) + ' </td>' +
													'<td> $' + numberWithCommas( acessory_cost_price_total ) + ' </td>' +
												'</tr>';
												
					print_acessory_table_header +=  '<tr>' + 
													'<td class="text-bold" > Acessories </td>' +
													'<td class="text-bold" > Quantity </td>' +
													//'<td> $' + numberWithCommas( acessory_retail_price ) + ' </td>' +
													//'<td> $' + numberWithCommas( acessory_list_price  ) + ' </td>' +
													//'<td> $' + numberWithCommas( acessory_cost_price ) + ' </td>' +
												'</tr>';
												
												
					print_acessories_data += '<table id="input_data_table_5" class="table_print_pdf">';
					
					
					print_acessories_data += print_acessory_table_header;
					print_acessories_data += print_acessory_table_sub;						
					print_acessories_data += '</table><div class="br_line"><br/></div>';
												
				}
				

				print_input_data += '<tr>' + 
										'<td> Vendor : ' + $('#main_unit option:selected').text() + ' </td>' + 
										'<td> Multiplier : ' + $('#main_unit option:selected').val() + ' </td>' + 
										'<td> Surcharges : ' + round_2_digits ( Number ( vendorSurcharge ) * 100 - 100 ) + '% </td>' + 
									'</tr>';
									
				print_input_data += '<tr>' + 
										'<td> Upcharge : ' + jQuery('#main_unit option:selected').attr('data-upcharge') + ' % </td>' + 
										'<td> Client Scale : ' + $('#discount option:selected').text() + ' </td>' + 
										'<td> Shipping : $' + numberWithCommas(shipping) + ' </td>' + 
									'</tr>';				
				
				print_input_data += '</table><div class="br_line"><br/></div>';
				
				totalCost = round_2_digits( totalCost + Number(shipping) + Number ( modificationtotalPrice ) ); // + Number(surcharge);
				clientPrice = round_2_digits( clientPrice + Number(shipping) + Number ( modificationtotalPrice ) ); // + Number(surcharge);
				
				
				print_cost_table += '<tr>' + 
										'<td class="text-bold"> Total </td>' +
										'<td class="text-bold"> $' + numberWithCommas( round_2_digits( clientPrice ) ) + ' </td>' +
										'<td class="text-bold"> $' + numberWithCommas( round_2_digits( listprice ) ) + ' </td>' +
										'<td class="text-bold"> $' +  numberWithCommas( round_2_digits(totalCost) ) + ' </td>' +
									'</tr>';
									
				print_cost_table += print_cost_table_sub;
				print_cost_table += '</table><div class="br_line"><br/></div>';
											
											
											
				
				let profit = round_2_digits(clientPrice - totalCost);
				
				$("#clientPrice").text("$ " + numberWithCommas(clientPrice));
				
				let currentDate = new Date().toLocaleString();
				
				//$("#date").text(currentDate);	
				
				$("#resultsTable").show();
				
				$('html, body').animate({
					scrollTop: $("#resultsTable").offset().top
				}, 1000);
								
				let print_header = '<table class="img_td table_print_1 table_print_pdf" id="table_print_1">' +
										'<tr class="img_td">' +
											'<td><img src="images/logo.png" alt="logo" id="logo_print" class=""/> </td>' +
											'<td class="text-right"><br/> <span id="date">' + 
											currentDate +
											'</span> <br/> <span id="serial_num">' + 
											'Document # 0125' + round_zero_decimal_digits(profit) + '00' + ' </span></td>' +
										'</tr>' +
									'</table>' +
									'<div class="table_print_1">' +
										'<br/>' +
										'<h2>Result</h2>' +
										'<br/>' +
									'</div>';
									
				
				$('#editor').append(print_header);
				$('#editor').append(print_project_info);
				$('#editor').append(print_cost_table);								
				$('#editor').append(print_input_data);
				$('#editor').append(print_acessories_data);
				
				
			});	
			
});
