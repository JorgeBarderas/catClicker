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
            catAdminView.init();
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
            catAdminView.render();
        },
        showAdminPanel: function() {
            catAdminView.render();
            catAdminView.showPanel();
        },
        updateCat: function(name, src, counter) {
            model.cats[model.currentCat.id].name = name;
            model.cats[model.currentCat.id].img = src;
            model.cats[model.currentCat.id].clicks = counter;
            model.currentCat = model.cats[model.currentCat.id];

            catView.render();
            catAdminView.hidePanel();
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
                        catAdminView.render();
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
            this.catAdminElem = $("#display").children("button");

            this.catImgElem.click(function() {
                octopus.incrementCounter();
            });
            this.catAdminElem.click(function() {
                octopus.showAdminPanel();
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

    var catAdminView = {
        init: function() {
            this.panel = $("#admin");
            this.catNameInp = $("#inpName", "#admin");
            this.catSrcInp = $("#inpSrc", "#admin");
            this.catCounterInp = $("#inpCounter", "#admin");
            this.catBTSave = $("#btSave", "#admin");
            this.catBTCancel = $("#btCancel", "#admin");

            var view = this;
            this.catBTSave.click(function() {
                octopus.updateCat(
                        view.catNameInp.val(),
                        view.catSrcInp.val(),
                        view.catCounterInp.val()
                    );
            });
            this.catBTCancel.click(function() {
                view.hidePanel();
            });
            this.render();
        },
        showPanel: function() {
            this.panel.show();
        },
        hidePanel: function() {
            this.panel.hide();
        },
        render: function() {
            var cat = octopus.getCurrentCat();
            this.catNameInp.val(cat.name);
            this.catSrcInp.val(cat.img);
            this.catCounterInp.val(cat.clicks);
        }
    }

    octopus.init();
});