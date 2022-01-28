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
			
			jQuery('#main_unit').change(function() {
				var eventTypeName = $("#main_unit option:selected");

				if (eventTypeName.is('[name="CNG"]') ) {
					jQuery('.modification').show();
				}else{
					jQuery('.modification').hide();
				}

			});
			
			
			var num1 = 0;
			
			jQuery( ".plus" ).click(function( event ){
				event.preventDefault();
				if (num1 <= 25){
					num1 = num1 + 1;
					newfield = priceField(num1);
					$(this).parent().parent().parent().append(newfield);
				}
				
				if ( $("#main_unit option:selected").is('[name="CNG"]') ) {
					jQuery('.modification').show();
				}
			});

			jQuery("#priceCalcForm").on("click",".minus", function(){
				jQuery(this).parent().parent().remove();
				num1 = num1 - 1;
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
				
				var priceInput_Array = [];
				
				let name = jQuery('#main_name').val();
				let projectName = jQuery('#project_name').val();
				
				let vendor = Number( jQuery('#main_unit').val() );
				let upCharge = Number( jQuery('#main_unit option:selected').attr('data-upcharge') )/100;
				
				let vendorSurcharge = jQuery('#main_unit option:selected').attr('data-upcharge') ? Number( $('#main_unit option:selected').attr('data-surcharge') )/100 : 0;
				
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
					
					modificationprice = Number ( jQuery('.list_price_m ').eq(cnt1).val() );
					modificationtotalPrice += modificationprice;
					
					price = Number( $(this).val() );
					listprice = listprice + price;
					price = price + ( Number( $(this).val() ) * Number(vendorSurcharge) );
					price = round_2_digits( ( price * Number(vendor) ) ) ;
					
					totalCost += round_2_digits(price);
					clientPrice += round_2_digits( price + (price * upCharge)  - (( price + (price * upCharge) ) * discount) );
					
					print_ind_data += '<tr><td>' + $(this).parent().parent().parent().find('.description').val() + ' </td>';
					print_ind_data += '<td> $ ' + numberWithCommas( Number(price) ) + ' </td></tr>';
					
					
					print_cost_table_sub +=  '<tr>' + 
												'<td>' + $(this).parent().parent().parent().find('.description').val() + ' </td>' +
												'<td> $' + numberWithCommas( round_2_digits( price + (price * upCharge) - (( price + (price * upCharge)) * discount) + shipping_part + modificationprice ) ) + ' </td>' +
												'<td> $' + numberWithCommas( Number( $(this).val() ) ) + ' </td>' +
												'<td> $' + numberWithCommas( round_2_digits(price + shipping_part + modificationprice) ) + ' </td>' +
											'</tr>';
					
					cnt1++;

					shipping_part = cnt1 > 1 ? 0 : 	shipping_part;
					
				});
				
				

				print_input_data += '<tr>' + 
										'<td> Vendor : ' + $('#main_unit option:selected').text() + ' </td>' + 
										'<td> Client Scale : ' + $('#discount option:selected').text() + ' </td>' + 
									'</tr>';
									
				print_input_data += '<tr>' + 
										'<td> Surcharges : ' + round_2_digits ( Number ( vendorSurcharge ) * 100 ) + '% </td>' + 
										'<td> Shipping : $' + numberWithCommas(shipping) + ' </td>' + 
									'</tr>';				
				
				print_input_data += '</table><div class="br_line"><br/></div>';
				
				totalCost = totalCost + Number(shipping) + Number ( modificationtotalPrice ); // + Number(surcharge);
				clientPrice = clientPrice + Number(shipping) + Number ( modificationtotalPrice ); // + Number(surcharge);
				
				
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
				
			});	
			
});
