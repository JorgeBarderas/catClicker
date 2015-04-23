$(function(){
    var model = {
        currentCat: null,
        cats: [
            {
                id: 0,
                name: "Josh",
                img: "./images/josh.jpg",
                clicks: 0
            },
            {
                id: 1,
                name: "Tim",
                img: "./images/tim.jpg",
                clicks: 0
            },
            {
                id: 2,
                name: "Michael & Robin",
                img: "./images/michael_robin.jpg",
                clicks: 0
            },
            {
                id: 3,
                name: "Cowboy Dave",
                img: "./images/cowboy.jpg",
                clicks: 0
            },
            {
                id: 4,
                name: "Dylan",
                img: "./images/dylan.jpg",
                clicks: 0
            }
        ]
    };


    var octopus = {
        init: function() {
            model.currentCat = model.cats[0];
            catListView.init();
            catView.init();
        },
        getCats: function() {
            return model.cats;
        },
        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        incrementCounter: function() {
            model.currentCat.clicks++;
            catView.render();
        }
    };


    var catListView = {
        init: function() {
            this.render();
        },
        render: function(){
            var cats = octopus.getCats();
            $.each(cats, function() {
                var cat = this;
                var $link = $("<a href='#'>"+cat.name+"</a>");
                $link
                    .click(function() {
                        octopus.setCurrentCat(cat);
                        catView.render();
                    })
                    .appendTo("#list");
            });
            $("#list").children().wrap("<li></li>");
        }
    };

    var catView = {
        init: function() {
            this.catElem = $("#display");
            this.catNameElem = $("#display").children("h2");
            this.catImgElem = $("#display").children("img");
            this.catCounterElem = $("#display").children("span");

            this.catImgElem.click(function() {
                octopus.incrementCounter();
            });
            this.render();
        },
        render: function(){
            var cat = octopus.getCurrentCat();
            this.catNameElem.text(cat.name)
            this.catCounterElem.text(cat.clicks);
            this.catImgElem.attr("src", cat.img)
        }
    };

    octopus.init();
});