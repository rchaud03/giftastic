
    $(document).ready(function () {

    var topicsArray = ["cartman", "randy marsh", "kyle broflovski","stan marsh"]

    function alertGifName() {
        var whatGif = $(this).attr("data-name");
        alert(whatGif);
      }

    //take gif input
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var addedGif = $("#gif-input").eq(0).val().trim();
        topicsArray.push(addedGif);
        console.log(addedGif);
        submitter();
        console.log(topicsArray);
        $("#gif-input").text("");

    });
   

     // Function for displaying gif button
     function submitter () {
       $("#gifBox").empty();
        for (var j = 0; j < topicsArray.length; j++) {
            var gifButton = $("<button>");//.addClass("searchThese").attr("data-name", topicsArray[j]).text(topicsArray[j]);
            gifButton.addClass("searchThese");
            gifButton.attr("data-name", topicsArray[j]);
            gifButton.text(topicsArray[j]);
            $("#gifBox").append(gifButton);

        }
        $(".searchThese").on("click", function () {
        var topic = $(this).attr("data-name");//.text;
        //console.log("this = "+ (this));
        //console.log("topic = " +topic);
        var apiKey = "&api_key=LhapBAq4FkXdl8vl71nlSUXt6G2kWM0B";
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+ topic + apiKey;
        //var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+ topic + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET",
            //Limits responses to 10 and orders in descending order
            data: {limit: 10, order: 'desc'}

        }).then(function(response) {
            console.log("query URL = " + queryUrl);
            //console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>"); 
                gifDiv.attr("topic", topic[i]);

                var ratingDiv = $("<p>");
                var returnedRating = results[i].rating;

                var returnedImage = $("<img class='gifs' data-state='still'>");
                //gifDiv.attr("src", results[i].images.fixed_height_still.url);           //need a variable to designate the images
                returnedImage.attr("src", results[i].images.fixed_height_still.url);

                returnedImage.attr("data-animated", results[i].images.fixed_height.url);
                returnedImage.attr("data-still", results[i].images.fixed_height_still.url);
                


                ratingDiv.append("Rating : " + returnedRating);
                gifDiv.append(returnedImage);
                gifDiv.append(ratingDiv);
                $("#gifDump").prepend(gifDiv);

            }
        })
    }) //ajax ends
    } //submitter ends



    //$(document).on("click", ".gifs", submitter);
    submitter();


    // on click switch the url from still to animated
    //$(".gifs").on("click", function () {
    $(document).on("click", ".gifs", function() {

        var state = $(this).attr("data-state");
        console.log(this);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
        } else 
        {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    //$(document).on("click", ".gifs", pauseAnimate);

    ////////////////////////////
    //When button is clicked
    //////////////////////////

//.ready
    })
