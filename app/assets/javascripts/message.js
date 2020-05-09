$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__message-list__message">
         <div class="chat-main__message-list__message__info">
           <div class="chat-main__message-list__message__info__member-name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__message__info__message-time">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__message__detail">
           <p class="Message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__message-list__message">
         <div class="chat-main__message-list__message__info">
           <div class="chat-main__message-list__message__info__member-name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__message__info__message-time">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__message__detail">
           <p class="Message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('.chat-main__message-form__form').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__message-list').append(html);
    $('.chat-main__message-form__form')[0].reset();
    $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    $('.chat-main__message-form__form__send-btn').attr('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
    $('.chat-main__message-form__form__send-btn').attr('disabled', false);
  });
})
});