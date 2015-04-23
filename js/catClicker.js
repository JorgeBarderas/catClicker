$(function(){
    var model = {
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
                name: "Thunder",
                img: "./images/thunder.jpg",
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
        current: null,
        init: function() {
            this.current = model.cats[0];
            view_list.init();
            view_display.init();
        },
        getCat: function(index) {
            return null;
        },
        getCats: function() {
            return model.cats;
        },
        showCat: function(cat) {
            this.current = cat;
            view_display.render();
        }
    };


    var view_list = {
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
                        octopus.showCat(cat);
                    })
                    .appendTo("#list");
            });
            $("#list").children().wrap("<li></li>");
        }
    };

    var view_display = {
        init: function() {
            this.render();
        },
        render: function(){
            $("#display").children().remove();

            $("#display")
                .append("<p class='cat-name'>"+octopus.current.name+"</p>")
                .append("<img class='cat-img' src='"+octopus.current.img+"' />")
                .append("<span class='cat-clicks'>"+octopus.current.clicks+"</span>");

            $("#display img").click(function (a_catCopy){
                octopus.current.clicks++;
                $(".cat-clicks","#display").text(octopus.current.clicks);
            });
        }
    };

    octopus.init();
});