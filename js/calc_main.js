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
			
			var priceFieldHtml = '<div class="row input_field">' + 
					'<div class="col-md-6">' + 
						'<label>' + 
							'Description' + 
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
			
			
			jQuery( ".plus" ).click(function( event ){
				event.preventDefault();
				 $(this).parent().parent().parent().append(priceFieldHtml);
				//console.log( $(this).parent().parent().parent().append(priceFieldHtml) );
			});
			/*
			jQuery( ".minus" ).click(function( event ){
				event.preventDefault();
				console.log("test");
				console.log($(this).parent().parent().attr("class"));
				$(this).parent().parent().remove();
				
			});
			*/
			jQuery("#priceCalcForm").on("click",".minus", function(){
				jQuery(this).parent().parent().remove();
			});
				
			jQuery( "#price_calc_btn" ).click(function( event ){

				event.preventDefault();
				
				jQuery("#input_data_table").remove();
				
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
				
				let discount =  $('#discount').val() ? Number( $('#discount').val() )/100 : 0;
				
				let shipping =  $('#shipping').val() ? Number( $('#shipping').val() ) : 0;
				let surcharge =  $('#surcharge').val() ? Number( $('#surcharge').val() ) : 0;
				
				let print_input_data = '<table id="input_data_table"> <tr> <th class="thead-dark"> Description</th> <th class="thead-dark"> </th></tr>';
				
				let print_ind_data = '';
				
				
				$('.list_price').each(function () {
					price = round_2_digits ( Number( $(this).val() ) * Number(vendor) );
					totalCost += round_2_digits(price);
					clientPrice += round_2_digits( price + (price * upCharge) - (price * discount) );
					
					print_input_data += '<tr><td>' + $(this).parent().parent().parent().find('.description').val() + ' </td>';
					print_input_data += '<td> List price $ ' + numberWithCommas( Number( $(this).val() ) ) + ' </td></tr>';
					
					print_ind_data += '<tr><td>' + $(this).parent().parent().parent().find('.description').val() + ' </td>';
					print_ind_data += '<td> $ ' + numberWithCommas( Number(price) ) + ' </td></tr>';
					
					
					//console.log($(this).parent().parent().parent().find('.description').val());
				});
				
				
				
				print_input_data += '<tr><td> Vendor </td>';
				print_input_data += '<td>' + $('#main_unit option:selected').text() + ' </td></tr>';
				
				print_input_data += '<tr><td> Shipping </td>';
				print_input_data += '<td> $ ' + numberWithCommas(shipping) + ' </td></tr>';
				
				print_input_data += '<tr><td> Surcharge </td>';
				print_input_data += '<td> $ ' + numberWithCommas(surcharge) + ' </td></tr>';
				
				print_input_data += '<tr><td> Discount </td>';
				print_input_data += '<td>' + discount * 100 + ' % </td></tr>';
				
				
				print_input_data += '</table>';
				
				totalCost = totalCost + Number(shipping) + Number(surcharge);
				clientPrice = clientPrice + Number(shipping) + Number(surcharge);
				
				let profit = round_2_digits(clientPrice - totalCost);
				
				$("#totalCost").text("Total Cost Price is : $" + numberWithCommas(totalCost) );
				$("#clientPrice, #print_clientPrice").text("$ " + numberWithCommas(clientPrice));
				$("#serial_num").text("Document # 0125" + round_zero_decimal_digits(profit) + "00");
				
				let currentDate = new Date().toLocaleString();
				
				$("#date").text(currentDate);	
				
				$("#resultsTable").show();
				
				$('html, body').animate({
					scrollTop: $("#resultsTable").offset().top
				}, 1000);
				
				let print_retail_price = '<table id="input_data_table"> <tr> <td id="totalCost" colspan="2" class="text-center">Retail Price is : $' + numberWithCommas(clientPrice) +  '</td></tr>';
				print_retail_price += print_ind_data;
				
				print_retail_price +=	'</table><br/>';
									
				
				
				$('#editor').append(print_retail_price);
				
				
				let print_total_price = '<table id="input_data_table"> <tr> <td id="totalCost" colspan="2" class="text-center">Total Cost Price is : $' + 
											numberWithCommas(totalCost) +  
											'</td></tr></table><br/>' + 
											'<h2>Input Data</h2>'+
											'<br/>';
				
				$('#editor').append(print_total_price);
				
				
				$('#editor').append(print_input_data);
				
			});	
			
});
