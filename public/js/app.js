// bypassing CORS

$(document).ready(function() {
    $("#tweets").hide();
    $("#results").hide();
});

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

// on click that grabs in the input from the text box whex`xn submit is pressed
$("#searchBtn").on("click", function () {
    var address = $(".search").val().trim();
    var queryURL =
        "http://www.mapquestapi.com/geocoding/v1/address?key=Hh2Y6dWsZuA1C3ZM4fUcz1KEoUUAKHB2&location=" +
        address;
    // ajax call of the URL to get last long
    $.ajax({
        url: queryURL,
        method: "GET"
        // parse and store responses
    }).then(function (response) {
        console.log(response);
        console.log(response.results[0].locations[0].latLng);
        var lat = response.results[0].locations[0].latLng.lat;
        var lng = response.results[0].locations[0].latLng.lng;
        console.log(lat);
        console.log(lng);
        showResults(lat, lng);
        get_woeid_from_latlong(lat, lng);
    });
});

function showResults(lat, lng) {
    console.log(lat)
    console.log(lng)
}
// function that calls API that gets the WOEID from lat long
function get_woeid_from_latlong(lat, lng) {
    $.ajax({
        url: "https://api.twitter.com/1.1/trends/closest.json?lat=" + lat + "&long=" + lng,
        method: "GET",
        headers: {
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAKH%2F5gAAAAAAN9kwQVJuDJk%2Fm1KHHjEugsyFn7c%3DDzSgSVav4KccD3cvoIwEG5lpjoMTjCJVVartb5jfmICvzupeme"
        }
        //parse and store responses
    }).then(function (response) {
        console.log(response);
        console.log(response[0].woeid);
        var woeid = response[0].woeid;
        get_trending_topics(woeid);
    });
}
// function that calls the Twitter API for trends
function get_trending_topics(woeid) {
    $.ajax({
        url: "https://api.twitter.com/1.1/trends/place.json?id=" + woeid,
        method: "GET",
        headers: {
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAKH%2F5gAAAAAAN9kwQVJuDJk%2Fm1KHHjEugsyFn7c%3DDzSgSVav4KccD3cvoIwEG5lpjoMTjCJVVartb5jfmICvzupeme"
        }
        //parse and store responses
    }).then(function (response) {
        console.log(response);
        var container = document.getElementById("results");
        for (var i = 0; i < 20; i++) {
            container.innerHTML +=
            `<div class="trends" data-value="${response[0].trends[i].name}"><a href="#">${response[0].trends[i].name}</a></div>`;
        }
        $("#results").fadeIn(500);
    });
}

$("div").on("click", "div.trends", function () {

    $("#tweets").empty();
    $("#tweets").fadeIn(500);

    function getTweets(trend) {

        console.log(trend.replace('#', ''));

        $.ajax({
            url: "https://api.twitter.com/1.1/search/tweets.json?q=" + trend.replace('#', ''),
            method: "GET",
            headers: {
                "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAKH%2F5gAAAAAAN9kwQVJuDJk%2Fm1KHHjEugsyFn7c%3DDzSgSVav4KccD3cvoIwEG5lpjoMTjCJVVartb5jfmICvzupeme"
            }
            //parse and store responses
        }).then(function (response) {
            console.log(response.statuses[0]);


            var container = document.getElementById("tweets");
            for (var i = 0; i < 20; i++) {
                container.innerHTML +=
                    `<div class="rawtweets" data-value="${response.statuses[i].text}" data-value1="${response.statuses[i].user.screen_name}" data-value2="${response.statuses[i].retweet_count}" data-value3="${response.statuses[i].favorite_count}" data-value4="${response.statuses[i].user.location}" data-value5="${response.statuses[i].user.name}" data-value6="${trend}" data-value7="${response.statuses[i].user.followers_count}"><a href="#">${response.statuses[i].text}</a></div><br>`;

            }
        });
    }

    getTweets($(this).text());

});

$("div").on("click", "div.rawtweets", function () {

    var tweetData = {
        text: $(this).text(),
        username: $(this).attr("data-value1"),
        followers: $(this).attr("data-value7"),
        profile: $(this).attr("data-value5"),
        trend: $(this).attr("data-value6"),
        location: $(this).attr("data-value4"),
        retweets: $(this).attr("data-value2"),
        favorites: $(this).attr("data-value3")

    }
    console.log(tweetData);

    $.post("/api/tweets", tweetData)

        .then(function (data) {
            alert("tweet has been posted!")
            console.log(data);
        });
        window.location.href = "/public/results"    
});

$("#searchBtndb").on("click", function () {
    var trend = $(".searchdb").val().trim();
    console.log(trend);   
    $.get("/api/tweets?trend=" + trend)

    .then(function(data){
        if (data === {}) {
            console.log("no data!");
        }
        console.log(data);
        for (i = 0; i < data.length; i++) {
            $("#getrouteresults").append(data[i].text);
        };
    });
});