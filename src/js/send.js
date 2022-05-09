"use strict";
define(["jquery"], function($) {
  
//  var domainString = window.location.origin;
//document.domain = string;
  
  $(function () {
      $("[name=send]").click(function () {

          $(":input.error").removeClass('error');
//          $(":select.error").removeClass('error');
          $(":input").parent('.field').removeClass('border_dashed');
          $("select").parent('.field').removeClass('border_dashed');
     
          $(".allert").remove();
          var error;
          var btn = $(this);
          var ref = btn.closest('form').find('[required]');
          var msg = btn.closest('form').find('input, textarea, select');


          var send_btn = btn.closest('form').find('[name=send]');

           $(ref).each(function() {
              if ($(this).val() == '') {
                  var errorfield = $(this);
                  $(this).addClass('error').parent('.field') /*.append('<span class="allert">Fill this field</span>') */;
                  error = 1;
                  $(":input.error:first");
                  return;
              } else {
                  var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                  if ($(this).attr("type") == 'email') {
                      if(!pattern.test($(this).val())) {
  //                        $("[name=email]").val('');
                          $(this).addClass('error').parent('.field') /*.append('<span class="allert">Enter a valid e-mail</span>') */;
                          error = 1;
                          $(":input.error:first");
                      }
                  }
                  var patterntel = /^()[0-9]{9,18}/i;
                  if ( $(this).attr("type") == 'tel') {
                      if(!patterntel.test($(this).val())) {
  //                        $("[name=phone]").val('');
                          $(this).addClass('error').parent('.field') /*.append('<span class="allert">Enter a valid phone number</span>') */;
                          error = 1;
                          $(":input.error:first");
                      }
                  }

                
              }

  });

          if (!(error == 1)) {
              $(send_btn).each(function () {
                  $(this).attr('disabled', true);
              });
              $(function () {
                  var form = $(this).closest('form'),
                      name = form.find('.name').val();
                  if ($(this).val() == '') {


                      $.ajax({
                          type: 'POST',
                          url: 'https://idealstroy.od.ua/send.php',
                        
              
                          data: msg,
                          success: function() {
                              $('form').trigger("reset");
                              setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
                            
                             window.location.href = '/success';

                          },
                          error: function(xhr, str) {
                              alert('ERROR: ' + xhr.responseCode);
                          }
                      });

                  }


              });
          } ;


          return false;
      })
  });

});





