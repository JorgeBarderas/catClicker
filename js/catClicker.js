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
        current: null,
        init: function() {
            this.current = model.cats[0];
            view_list.init();
            view_display.init();
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
        $template: "",
        init: function() {
            this.$template = $("#tmplt-cat");
            this.render();
        },
        render: function(){
            $("#display").children().remove();
            var cat = octopus.current;
            var $catEl = this.$template.clone();
            $catEl.children("h2").text(cat.name);
            $catEl.children("img").attr("src", cat.img);
            $catEl.children("span").text(cat.clicks);
            $catEl.appendTo("#display");

            $("#display img").click(function (){
                cat.clicks++;
                $(".cat-clicks","#display").text(cat.clicks);
            });
        }
    };

    octopus.init();
});