

$(document).on('pagebeforeshow', '#attractionList', function(event){   
  console.log("pagebeforeshow attractions.js");
  //console.log(data.prevPage.attr('park'));

  //var parameters = $(this).data("url").split("?")[1];
  //localStorage.clear();
  //get the selected park
  var park = sessionStorage.park;
  var theUrl;
  console.log("park:"+park);

  //set the header value
  $('h1').empty();
  $('h1').append(sessionStorage.parkTitle);


  theUrl = "http://touringplans.com/" + sessionStorage.parkUrl + "/attractions.json";
  console.log("theUrl:"+theUrl);
  $.ajax({url: theUrl,
        dataType: "json",
        async: true,
        success: function (result) {
          console.log("success!");
          ajax.parseJSON(result, park);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    }); 

 });
 
var ajax = {  
  parseJSON:function(data, park){
    var output = '';
    var items = []; //put all link names into an array
    var count = 0;
    var attraction;
    var rating;
    $.each(data, function (index, val) {
      //add each value to the output buffer
      output += '<li>' + val.short_name + '<span class="ui-li-aside" style="padding:0px 0px 0px 0px;"><div  id="line_' + val.permalink + '" class="rateit bigstars" ></div></span></li>';
      items.push(val.permalink);
      count++;
    });
    //now append the buffered output to the listview and either refresh the listview 
    //or create it (meaning have jQuery Mobile style the list)
    $('#mylist').empty();
    $('#mylist').append(output).listview('refresh');
    $('.rateit').rateit();
    count = 0;
    $.each(data, function (index, val) {
      //get the saved value if there is one
      try {
        rating = 0;
        attraction = JSON.parse(localStorage[val.permalink]);
        console.log("attraction 1:"+attraction);
        if (attraction) {
          rating = attraction.rating;
        }
        $("#line_" + val.permalink).rateit('value', rating);
      } catch (ex) { console.log("error:" + ex) }

      //save the rating and park info
      //TODO move this to a function
      $("#line_" + val.permalink).bind('rated', function (event, value) {
        //console.log(" setting item:" + items[index] + " to value:" value);
        attraction = {};
        attraction.name = val.short_name;
        attraction.permalink = val.permalink;
        attraction.rating = value;
        attraction.park = sessionStorage.park;
        console.log("saving attraction: " + JSON.stringify(attraction));
        localStorage.setItem(val.permalink, JSON.stringify(attraction));
        //recalc the average
        calcAverage(park);

      });
      
      //TODO move this to a function
      $("#line_" + val.permalink).bind('reset', function () {
        //remove from localStorage
        //TODO set the rating to zero instead of removing the object?
        localStorage.removeItem(val.permalink);
        calcAverage();
      });
      count++;
    });


    calcAverage(park);
  }
}





function calcAverage(park) {
  console.log("calculate average for park: " + park);
  //calculate the average
  var total = 0.0;
  var rating = 0;
  var count = 0;
  var rating, attraction;

  for (i = 0; i < localStorage.length; i++) {
    //only figure attractions for this park into the equation
    attraction = JSON.parse(localStorage[localStorage.key(i)]);
    console.log("attraction 2:"+localStorage[localStorage.key(i)]);
    if (park == attraction.park) {
      rating = attraction.rating;
      if (isNaN(rating)) {
        rating = 0;
      }
      // if (localStorage[localStorage.key(i)]) {
      //   rating = localStorage[localStorage.key(i)].rating;
      // }   
      total = total + parseFloat(rating);
      console.log("rating for:" + attraction.name + " rating:" + rating);
      count++;
    }
  }
  var raw = total / count;
  if (isNaN(raw)) {
    raw = 0;
  }
  console.log("setting average to:" + Math.round(raw * 100) / 100);
  //set the average value on the div
  $("#average").text(Math.round(raw * 100) / 100);
}

//TODO calculate the percentage of attractions rated
function calcPercent() {
}

//based on attraction ratings suggest similar attractions you may like
function attractionSuggestions() {
}



