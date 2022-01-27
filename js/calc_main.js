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
					'<div class="col-md-6">' + 
						'<label>' + 
							'Group B' + 
						'</label>' + 
						'<div class="input_field_n_dollar">' + 
							'<input type="text" id="" class="number_req form-control description" name ="" value=""/>' + 
						'</div>' + 
					'</div>' + 
					'<div class="col-md-5">' + 
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
					'<div class="col-md-6">' + 
						'<label>' + 
							'Group ' + Alphabet_Array[num1] + 
						'</label>' + 
						'<div class="input_field_n_dollar">' + 
							'<input type="text" id="" class="number_req form-control description" name ="" value=""/>' + 
						'</div>' + 
					'</div>' + 
					'<div class="col-md-5">' + 
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
			
			var num1 = 0;
			
			jQuery( ".plus" ).click(function( event ){
				event.preventDefault();
				if (num1 <= 25){
					num1 = num1 + 1;
					newfield = priceField(num1);
					$(this).parent().parent().parent().append(newfield);
				}
			});

			jQuery("#priceCalcForm").on("click",".minus", function(){
				jQuery(this).parent().parent().remove();
				num1 = num1 - 1;
			});
				
			jQuery( "#price_calc_btn" ).click(function( event ){

				event.preventDefault();
				
				jQuery("#input_data_table_1, #input_data_table_2, #input_data_table_3, .table_print_1").remove();
				
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
				
				var priceInput_Array = [];
				
				let vendor = Number( $('#main_unit').val() );
				let upCharge = Number( $('#main_unit option:selected').attr('data-upcharge') )/100;
				
				let vendorSurcharge = $('#main_unit option:selected').attr('data-upcharge') ? Number( $('#main_unit option:selected').attr('data-surcharge') )/100 : 0;
				
				let discount =  $('#discount').val() ? Number( $('#discount').val() )/100 : 0;
				
				let shipping =  $('#shipping').val() ? Number( $('#shipping').val() ) : 0;
				let surcharge =  $('#surcharge').val() ? Number( $('#surcharge').val() ) : 0;
				
				let print_input_data = '<table id="input_data_table_3"> <tr> <th class="thead-dark"> Description</th> <th class="thead-dark"> </th></tr>';
				
				let print_ind_data = '';
				
				
				$('.list_price').each(function () {
					
					price = Number( $(this).val() );
					price = price + ( Number( $(this).val() ) * Number(vendorSurcharge) );
					//price = round_2_digits ( Number( $(this).val() ) * Number(vendor)  );
					price = round_2_digits( price * Number(vendor) ) ;
					
					totalCost += round_2_digits(price);
					clientPrice += round_2_digits( price + (price * upCharge) - (price * discount) );
					
					print_input_data += '<tr><td>' + $(this).parent().parent().parent().find('.description').val() + ' </td>';
					print_input_data += '<td> List Price $ ' + numberWithCommas( Number( $(this).val() ) ) + ' </td></tr>';
					
					print_ind_data += '<tr><td>' + $(this).parent().parent().parent().find('.description').val() + ' </td>';
					print_ind_data += '<td> $ ' + numberWithCommas( Number(price) ) + ' </td></tr>';
					
				});
				
				

				print_input_data += '<tr><td> Vendor </td>';
				print_input_data += '<td>' + $('#main_unit option:selected').text() + ' </td></tr>';
				
				print_input_data += '<tr><td> Other Charges </td>';
				print_input_data += '<td>' + round_zero_decimal_digits( vendorSurcharge ) * 100 + ' % </td></tr>';
				
				print_input_data += '<tr><td> Shipping </td>';
				print_input_data += '<td> $ ' + numberWithCommas(shipping) + ' </td></tr>';				
				
				print_input_data += '<tr><td> Discount </td>';
				print_input_data += '<td>' + discount * 100 + ' % </td></tr>';
				
				
				print_input_data += '</table>';
				
				totalCost = totalCost + Number(shipping); // + Number(surcharge);
				clientPrice = clientPrice + Number(shipping); // + Number(surcharge);
				
				let profit = round_2_digits(clientPrice - totalCost);
				
				$("#totalCost").text("Total Cost Price is : $" + numberWithCommas(totalCost) );
				$("#clientPrice").text("$ " + numberWithCommas(clientPrice));
				
				let currentDate = new Date().toLocaleString();
				
				//$("#date").text(currentDate);	
				
				$("#resultsTable").show();
				
				$('html, body').animate({
					scrollTop: $("#resultsTable").offset().top
				}, 1000);
				
				let print_retail_price = '<table id="input_data_table_1"> <tr> <td id="totalCost" colspan="2" class="text-center">Retail Price is : $' + numberWithCommas(clientPrice) +  '</td></tr>';
				print_retail_price += print_ind_data;
				
				print_retail_price +=	'</table>';
				
				
				let print_header = '<table class="img_td table_print_1">' +
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
				
				$('#editor').append(print_retail_price);
				
				
				let print_total_price = '<table id="input_data_table_2"> <tr> <td id="totalCost" colspan="2" class="text-center">Total Cost Price is : $' + 
											numberWithCommas(totalCost) +  
											'</td></tr></table>'+
											'<div class="table_print_1"><br/>' + 
											'<h2>Input Data</h2>'+
											'<br/></div>';
				
				$('#editor').append(print_total_price);
				
				
				$('#editor').append(print_input_data);
				
			});	
			
});
