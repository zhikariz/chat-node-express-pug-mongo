let sender = getSearchParams('sender');
let receiver = getSearchParams('receiver');
let nama_pengirim = sender == 1 ? 'Helmi 1' : 'Helmi 2';
let nama_penerima = receiver == 1 ? 'Helmi 1' : 'Helmi 2';


$(document).ready(function () {
  setTimeout(function () {
    window.location.reload(1);
  }, 5000);
  /*$.get("/api/chats/get/"+sender+"/"+receiver, function (data, status) {
    console.log(data);
  });*/
  $('#text-pesan').keydown(function (event) {
    // enter has keyCode = 13, change it if you want to use another button
    if (event.keyCode == 13) {
      this.form.submit();
      return false;
    }
  });
  $.ajax({
    url: "/api/chats/get/" + sender + "/" + receiver,
    type: 'GET',
    success: function (result) {
      result.forEach(obj => {
        //console.log(obj.id_pengirim);
        if (obj.id_pengirim == sender) {
          document.getElementById("chat").innerHTML += chatKiri(obj);
        } else {
          document.getElementById("chat").innerHTML += chatKanan(obj);
        }
      });
      scrollToBottom();
    }
  });
});


$("#btn-submit").click(function () {
  let pesan = $("#text-pesan").val();
  if (checkKosong(pesan)) {
    alert('Pesan Tidak Boleh Kosong !');
    return
  }
  let data = {
    id_pengirim: sender,
    nama_pengirim: nama_pengirim,
    id_penerima: receiver,
    nama_penerima: nama_penerima,
    message: pesan,
  };

  $.ajax({
    url: "/api/chats/send/" + sender + "/" + receiver,
    type: 'POST',
    data: data,
    success: function (obj) {
      if (obj.id_pengirim == sender) {
        document.getElementById("chat").innerHTML += chatKiri(obj);
      } else {
        document.getElementById("chat").innerHTML += chatKanan(obj);
      }
      scrollToBottom();
    }
  });
  $("#text-pesan").val("");
});

function scrollToBottom() {
  document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
}

function chatKanan(obj) {
  var date = new Date(obj.waktu_dikirim);
  return "<div class='direct-chat-msg right'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-right'>" + obj.nama_pengirim + "</span><span class='direct-chat-timestamp pull-left'>" + date.toDateString() + " " + date.toLocaleTimeString() + "</span></div><img class='direct-chat-img' src='/dist/img/user3-128x128.jpg'><div class='direct-chat-text'>" + obj.message + "</div></div>";
}

function chatKiri(obj) {
  var date = new Date(obj.waktu_dikirim);
  return "<div class='direct-chat-msg'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'>" + obj.nama_pengirim + "</span><span class='direct-chat-timestamp pull-right'>" + date.toDateString() + " " + date.toLocaleTimeString() + "</span></div><img class='direct-chat-img' src='/dist/img/user1-128x128.jpg'><div class='direct-chat-text'>" + obj.message + "</div></div>";
}


function getSearchParams(k) {
  var p = {};
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {p[k] = v})
  return k ? p[k] : p;
}

function checkKosong(data) {
  if (typeof (data) == 'number' || typeof (data) == 'boolean') {
    return false;
  }
  if (typeof (data) == 'undefined' || data === null) {
    return true;
  }
  if (typeof (data.length) != 'undefined') {
    return data.length == 0;
  }
  var count = 0;
  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      count++;
    }
  }
  return count == 0;
}
