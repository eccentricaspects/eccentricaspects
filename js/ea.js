$=jQuery||null

var EA = (function() {
    var base = '/images';
    var theme = '/galleria/themes/classic/galleria.classic.min.js';

    function getImageName( index ) {
        index = parseInt(index);
        if ( index < 10 ) {
            return "000" + index;
        } else if ( index < 100 ) {
            return "00" + index;
        } else if ( index < 1000 ) {
            return "0" + index;
        }
        return index;
    }

    function getUrl( name, index, type ) {
        return base + "/" + name + "/" + type + "/" + getImageName(index) + ".jpg";
    }

    /**
     * This function scans the current document for image
     * links that actually represent a galleria invocation.
     * If the document is rendered in a javascript-free
     * environment, the existing image links will be left alone,
     * giving the viewer an inline image of a representative
     * "small" image from whatever gallery.
     */
    function generateGalleriaDivs() {

        $(".eagallery").each( function(index) {
            var galleryUrl = $(this).attr("href");
            var regex = /images\/(\S+)\/(\S+)?/;
            var matches = regex.exec(galleryUrl);
            var galleryName = matches[1];
            var imageSpec = matches[2];
            var div = null;
            var linkIndex = null;
            if ( imageSpec ) {
                res = imageSpec.match( /^(\d+)$/ );
                if ( res ) {
                    linkIndex = res[1];
                }
            }

            if ( linkIndex !== null ) {
                div = "<img src=\"" +
                    getUrl( galleryName, linkIndex, "small" ) +
                    "\"/>";
            } else {
                var divId = galleryName + "-" + index;

                if ( imageSpec == null ) {
                    imageSpec = "null";
                }
                div = "<div id=" +
                    "\"" + divId + "\">" +
                    "<script type=\"text/javascript\">" +
                    "EA.loadGallery(" +
                    "\"" + galleryName + "\"," +
                    "\"" + divId + "\"," +
                    "\"" + imageSpec + "\")" +
                    "</script>" +
                    "</div>";
            }

            if ( $(this).text() ) {
                div += "<div style=\"font-size:10px\">" +
                    "<em>" +
                    $(this).text() +
                    "</em>" +
                    "</div>";
            }
            $(this).replaceWith( div );
        });
    }

    function getImageIndexes( imageStr ) {

        if ( imageStr === undefined ) {
            return ["1"];
        }

        var images = new Array();
        var tmp = imageStr.split( "," );

        for ( tmpIndex = 0; tmpIndex < tmp.length; tmpIndex++ ) {
            arg = tmp[tmpIndex];
            if ( arg.match(/^\d+$/) ) {
                images.push( arg );
            } else if ( range = arg.match(/^(\d+)-(\d+)$/) ) {
                start = range[1];
                end = range[2];
                if ( start <= end ) {
                    for ( index = range[1]; index <= range[2]; index++ ) {
                        images.push( index );
                    }
                }
            }
        }
        return images;
    }

    function getThumbImage( name, index ) {
        return getUrl( name, index, "thumb" );
    }

    function getSmallImage( name, index ) {
        return getUrl( name, index, "small" );
    }

    function getLargeImage( name, index ) {
        return getUrl( name, index, "large" );
    }

    function getOption( options, key, def ) {

        if ( options === undefined ||
             options[ key ] === undefined ) {
            return def;
        }

        return options[ key ];
    }

    function maybeNavigate(e) {
        var url;

        if ( e.keyCode == '37' ) {
            url = $("#next").attr('href')
        } else if (e.keyCode == '39') {
            url = $("#prev").attr('href')
        }

        if ( url !== undefined ) {
            window.location.href = url
        }
    }

    return {

        init : function () {
            document.onkeydown = maybeNavigate;
        },

        beforeAfter : function (divname, options) {

            var beforeText = getOption( options, "before", "Before" )
            var afterText = getOption( options, "after", "After" )

            var config = {
		animateIntro : false,
		introDelay : 1000,
		introDuration : 1000,
		introPosition : .5,
		showFullLinks : true,
		beforeLinkText: beforeText,
		afterLinkText: afterText,
		imagePath : '/images/',
		cursor: 'pointer',
		clickSpeed: 600,
		linkDisplaySpeed: 200,
		dividerColor: '#888',
            };

            $(document).ready( function () {
	        $("#" + divname ).beforeAfter(config);
            });
        },

        loadGallery : function (name, divname, images) {
            if (images === undefined) {
                images = [1];
            }
            var data = []
            var config = {
                debug: false,
                dataSource: data,
                width:600,
                height:450,
                lightbox: true,
                showInfo: false,
                showCounter: false,
                showImagenav: true,
                thumbnails: true,

                on_image: function(image, thumb) {
                    var gallery = this;
                    $(image).click( function() {
                        gallery.openLightbox();
                    });
                },
            };

            if ( images.length == 1 ) {
                config[ 'showImagenav' ] = false;
                config[ 'thumbnails' ] = false;
            }

            for ( index = 0; index < images.length; index++ ) {
                imageIndex = images[index];

                data.push( {
                    thumb: getThumbImage( name, imageIndex ),
                    image: getSmallImage( name, imageIndex ),
                    big:   getLargeImage( name, imageIndex )
                });
            }

            $(document).ready( function() {
                Galleria.loadTheme( theme );
                $("#" + divname).galleria(config);
            });
        },

    }})();

EA.init();
