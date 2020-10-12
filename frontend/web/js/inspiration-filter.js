define([
    'jquery',
    'domReady!'
], function ($) {
    var carouselItems = $('.carousel-item-disable');

    // Disable gallery opening before redirect on CMS page item
    carouselItems.each(function () {
        $(this).on('click', function (e) {
            var href = this.getAttribute('href');
            e.stopPropagation();
            e.preventDefault();
            window.location.href = href;
        })
    })

    var filterCategories = $('.filter-category-id input'),
        filterTypes = $('.filter-category-type input'),
        categories = $('.data-category-item'),
        showedItems = []; // contain all items that should be showed

    filterTypes.each(function () {
        var element = this;
        var type = $(element).attr('data-type');

        $(this).on('change', function () {
            if (showedItems.includes(type)) {
                showedItems = showedItems.filter(elem => elem !== type) // deleting item from array
            } else {
                showedItems.push(type) // pushing if item should be showed
            }

            // work with styles
            categories.each(function () {
                if (!!showedItems.includes($(this).attr('data-type'))) {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }
                if (!showedItems.includes('cms_page') && !showedItems.includes('gallery')) {
                    categories.each(function () {
                        $(this).parent().show();
                    });
                }
            })
        });
    });

    // Same logic as with types, but getting id dynamically
    filterCategories.each(function () {
        var element = this;
        var category = $(element).attr('data-category-id');

        $(this).on('change', function () {
            if (showedItems.includes(category)) {
                showedItems = showedItems.filter(elem => elem !== category)
            } else {
                showedItems.push(category)
            }

            categories.each(function () {
                if (showedItems.includes($(this).attr('data-category-id'))) {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }

                if (showedItems.length == 0) {
                    categories.each(function () {
                        $(this).parent().show();
                    });
                }
            })
        });
    });
});
