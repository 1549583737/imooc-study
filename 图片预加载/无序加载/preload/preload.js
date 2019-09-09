//图片预加载
(function ($) {
    function PreLoad(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, PreLoad.DEFAULTS, options);
        this._unordered();
    }

    PreLoad.DEFAULTS = {
        each: null, //每一张图片加载完毕后调用
        all: null   //所有图片加载完成后调用
    };

    PreLoad.prototype._unordered = function () { //无序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        $.each(imgs, function (i, src) {
            if (typeof src != 'string') return;
            var image = new Image();
            $(image).on('load error', function () {
                opts.each && opts.each(count);
                if (count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
            });
            image.src = src;
        })
    }

    // $.fn.extend->$('#img').preload()
    // $.extend->$.preload()
    $.extend({
        preload: function (imgs, opts) {
            new PreLoad(imgs, opts);
        }
    })

}(jQuery));