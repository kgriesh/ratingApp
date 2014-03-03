//localStorage.clear();
//get the selected park
var park = sessionStorage.getItem('park');
var url = "../ajax/" + park + "_attractions.json";
console.log(url);
//url = "http://touringplans.com/magic-kingdom/attractions.json";

//Interate through all ratings to provide an average for the park
function doLoad() {


  //set the header value
  if (park == "mk") {
    $('h1').append("Magic Kingdom");
  }
  else if (park == "ak") {
    $('h1').append("Animal Kingdom");
  }
  else if (park == "ep") {
    $('h1').append("Epcot");
  }
  else if (park == "hs") {
    $('h1').append("Hollywood Studios");
  }

  calcAverage();
}

function calcAverage() {
  //calculate the average
  var total = 0.0;
  count = 0;
  for (i = 0; i < localStorage.length; i++) {
    //only figure attractions for this park into the equation
    console.log(localStorage[localStorage.key(i)]);
    var thisPark = JSON.parse(localStorage[localStorage.key(i)]).park;
    if (park == thisPark) {
      var rating = JSON.parse(localStorage[localStorage.key(i)]).rating;
      console.log("park:" + thisPark + " rating:" + rating);
      total = total + parseFloat(rating);
      count++;
    }
  }
  var raw = total / count;
  if (isNaN(raw)) {
    raw = 0;
  }
  //set the average value on the div
  $("#average").text(Math.round(raw * 100) / 100);
}

//TODO calculate the percentage of attractions rated
function calcPercent() {

}

//set headers
//if (park == "mk") {
//$("#theHeader.h1").html("<b>Magic Kingdom</b>");

//}

//get attractions
$.getJSON(url, function (data) {
  var output = '';
  var items = []; //put all link names into an array
  var count = 0;
  $.each(data, function (index, val) {
    //add each value to the output buffer (we also have access to the other properties of this object: id, start, and end)
    output += '<li>' + val.short_name + '<span class="ui-li-aside" style="padding:0px 0px 0px 0px;"><div  id="testrate' + count + '" class="rateit bigstars" ></div></span></li>';
    items.push(val.permalink);
    count++;
  });
  //now append the buffered output to the listview and either refresh the listview or create it (meaning have jQuery Mobile style the list)
  $('#mylist').append(output).listview('refresh');
  $('.rateit').rateit();
  var count = 0;
  $.each(data, function (index, val) {
    //get the saved value if there is one
    try {
      var rating = JSON.parse(localStorage.getItem(items[index])).rating;
      $("#testrate" + count).rateit('value', rating);
    } catch (ex) { /*swallow*/
    }

    //save the rating and park info
    $("#testrate" + count).bind('rated', function (event, value) {
      var attraction = {};
      attraction.name = items[index];
      attraction.rating = value;
      attraction.park = park;
      localStorage.setItem(items[index], JSON.stringify(attraction));
      //recalc the average
      calcAverage();

    });
    $("#testrate" + count).bind('reset', function () {
      //remove from localStorage
      //TODO set the rating to zero instead of removing the object?
      localStorage.removeItem(items[index]);
      calcAverage();
    });
    count++;
  });
});


