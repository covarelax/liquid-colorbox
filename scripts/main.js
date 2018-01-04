$(document).ready(function(){
    //Examples of how to assign the Colorbox event to elements
    $(".group1").colorbox({
        rel:'group1'
    });
    $(".group2").colorbox({rel:'group2', transition:"fade"});
    $(".group3").colorbox({rel:'group3', transition:"none", width:"75%", height:"75%"});
    $(".group4").colorbox({rel:'group4', slideshow:true});
    $(".ajax").colorbox();
    $(".youtube").colorbox({iframe:true, innerWidth:640, innerHeight:390});
    $(".vimeo").colorbox({iframe:true, innerWidth:500, innerHeight:409});
    $(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
    $(".inline").colorbox({inline:true, width:"50%"});
    $(".callbacks").colorbox({
        onOpen:function(){ alert('onOpen: colorbox is about to open'); },
        onLoad:function(){ alert('onLoad: colorbox has started to load the targeted content'); },
        onComplete:function(){ alert('onComplete: colorbox has displayed the loaded content'); },
        onCleanup:function(){ alert('onCleanup: colorbox has begun the close process'); },
        onClosed:function(){ alert('onClosed: colorbox has completely closed'); }
    });

    $('.non-retina').colorbox({rel:'group5', transition:'none'})
    $('.retina').colorbox({rel:'group5', transition:'none', retinaImage:true, retinaUrl:true});

    //Example of preserving a JavaScript event for inline calls.
    $("#click").click(function(){
        $('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
        return false;
    });

    // リキッドレイアウト
    $(".liquid").colorbox({
        rel:'liquid',
        onComplete:function(){
            var defaultSize = 1000;
            var colorboxResize = function(){
                var wW = $(window).width();
                var cW = wW - 80;
                if($(window).width() < 960){
                    $.colorbox.resize({'innerWidth':cW});
                } else {
                    $.colorbox.resize({'innerWidth':defaultSize});
                }
            };

            colorboxResize();


            $(window).on('resize.colorbox', function(){
                colorboxResize();
            });
        }
    });


    // リキッドレイアウト iframe
    $('.liquid-iframe').click(function(e) {

        e.preventDefault();
        var w = 800, h = 400;

        var sizeWH = $(this).attr('data-size').split(',');
        var colorbox_timer = 0;
        w = sizeWH[0];
        h = sizeWH[1];
        var fileName = $(this).attr("href");
        $.colorbox({
            innerWidth:w,
            innerHeight:h,
            transition: "fade",
            opacity: 0.8,
            href:fileName,
            iframe: true,
            scrolling:false,
            returnFocus:true,
            onOpen: function(){$('#colorbox').addClass('forMAP')},
            onComplete:function(){
                var frame = $('#cboxLoadedContent iframe');
                var old_h = 0, old_w = 0;
                var cresized = function(){
                    var cdoc =  $('body', frame.get(0).contentDocument);
                    var ww = $(window).width();
                    //var cw = cdoc.width();
                    var cw = w;
                    if(ww - 30 < cw)
                        cw = ww - 30;
                    if(w < cw)
                        cw = w;
                    var ch = cdoc.height();
                    if(old_w != cw || old_h != ch)
                        $.colorbox.resize({'innerWidth':cw, 'innerHeight':ch});
                    old_w = cw;
                    old_h = ch;
                };
                frame.on('load.colorbox', cresized);

                $(window).on('resize.colorbox', function(){
                    cresized();
                });

                colorbox_timer = setInterval(cresized, 250);
            },
            onCleanup:function(){
                var frame = $('#cboxLoadedContent iframe');
                frame.off('load.colorbox');
                $(window).off('resize.colorbox');
                clearInterval(colorbox_timer);
            },
            onClosed:function(){$("#colorbox").removeClass("forMV");}
        });
        return false;
    });
});