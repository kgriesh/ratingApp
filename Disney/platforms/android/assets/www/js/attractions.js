

var attractionCount;

$(document).on('pagebeforeshow', '#attractionList', function(event){   
  
  //localStorage.clear();

  var theUrl;

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
          ajax.parseJSON(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    }); 
 });
 
var ajax = {  
  parseJSON:function(data){
    var output = '';
    var items = []; //put all link names into an array
    var attraction;
    var rating;
    $.each(data, function (index, val) {
      //add each value to the output buffer
      output += '<li>' + val.short_name + '<span class="ui-li-aside" style="padding:0 20 0 0;"><div  id="line_' + val.permalink + '" class="rateit" ></div></span></li>';
      items.push(val.permalink);
      attractionCount++;
    });
    //now append the buffered output to the listview and either refresh the listview 
    //or create it (meaning have jQuery Mobile style the list)
    $('#mylist').empty();
    $('#mylist').append(output).listview('refresh');
    $('.rateit').rateit();
    $.each(data, function (index, val) {
      //get the saved value if there is one
      try {
        rating = 0;
        attraction = JSON.parse(localStorage[val.permalink]);
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
        localStorage.setItem(val.permalink, JSON.stringify(attraction));
        //recalc the average
        calcAverage();
        calcPercentRated();

      });
      
      //TODO move this to a function
      $("#line_" + val.permalink).bind('reset', function () {
        //remove from localStorage
        localStorage.removeItem(val.permalink);
        calcAverage();
        calcPercentRated();
      });
    });

    calcAverage();
  }
}



function calcAverage() {
  
  var total = 0.0;
  var rating = 0;
  var count = 0;
  var rating, attraction;

  for (i = 0; i < localStorage.length; i++) {
    //only figure attractions for this park into the equation
    attraction = JSON.parse(localStorage[localStorage.key(i)]);
    if (sessionStorage.park == attraction.park) {
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
function calcPercentRated() {
  var rated, raw;
  for (i = 0; i < localStorage.length; i++) {
    //only figure attractions for this park into the equation
    attraction = JSON.parse(localStorage[localStorage.key(i)]);
    if (sessionStorage.park == attraction.park) {
      rated++;
    }
  }
  raw = attractionCount / rated;
  if (isNaN(raw)) {
    raw = 0;
  }
  $("#percentRated").text(raw * 10);
}

//based on attraction ratings suggest similar attractions you may like
function attractionSuggestions() {
}



