$(document).ready(function() {

    $("#dialog").dialog({
        autoOpen: false,
    });

    getData();

});

function drop() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content"); 
      }
    }
  


function getData() {

    $.get("http://localhost:5000/api/media", function(data)  {

        var html_string = "";
       
        $(data).each(function(key, object) {
     
            html_string += "<tr><td class='main'><img src=" + object['pic'] + " width='110px' height='160px'>" + 
            "<p class='title'>" + object['media_name'] + "</p>" + 
            "<tr class='description'>"+
            "<td><button class='btn' onclick=\"editMedia('" + object['media_id'] + "')\">Edit</button>" +
            "<button class='btn' onclick=\"deleteMedia('" + object['media_id'] + "')\">Delete</button></td>" +
            "<td>"+ object['type'] + "</td>" +
            "<td>" + object['genre'] + "</td>" +
            "<td>"+ object['length'] + "</td>" +
            "<td>"+ object['release_date'] +"</td>"+
            "</tr><td>"
            html_string += "</td></tr>";
    
        });
    
        $("#table_body").html(html_string);
        
    });

}
function deleteMedia(media_id) {
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:5000/api/media/" + media_id,
        success: function (result) {
            alert("media removed.");
            document.getElementById(media_id).style.display = "none";
        }
    });
}

function editMedia(media_id) {
   $.ajax({
       type: 'PUT',
         url: "http://localhost:5000/api/media/" + media_id,
            data: {
                "pic": pic,
                "media_id": media_id,
                "media_name": media_name,
                "type": type,
                "genre": genre,
                "length": length,
                "release_date": release_date
            },
            statusCode: {
                200: function(response) {
                    alert("Media updated.");
                }
            },
            dataType: "json"
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function addMedia(){
    var media_id = getRandomInt(1000,2000);

    var pic = $("#pic").val();
    var media_name = $("#media_name").val();
    var type = $("#type").val();
    var genre = $("#genre").val();
    var length = $("#length").val();
    var release_date = $("#release_date").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/media", 
        data: {
            "pic": pic,
            "media_id": media_id,
            "media_name": media_name,
            "type": type,
            "genre": genre,
            "length": length,
            "release_date": release_date
        },
        statusCode: {
            200: function(response) {
                alert("Media added");
                 
                $("#pic").val("");
                $("#media_name").val("");
                $("#type").val("");
                $("#genre").val("");
                $("#length").val("");
                $("#release_date").val("");

            html_string += "<tr id=\"" + media_id + "\"><td>" + pic + media_name + 
            "</td><td>" + type + 
            "</td><td>" + genre + 
            "</td><td>" + length + 
            "</td><td>"+ release_date 
            html_string += "</td></tr>";

                $('#table_body').append(html_string);
            }
        },
        dataType: "json"
    });
    
}

    





