! function(a) {
    "use strict";

    function b(b, c) {
        this.regex = /^(.*)(\d)+$/i, this.elem = b, this.$elem = a(b), "undefined" != typeof c && "undefined" != typeof c.limit && c.limit > 0 && (c.maximum = c.limit), this.config = a.extend({}, d, c), this.clones = this.$elem.closestChild(this.config.cloneThis), this.init()
    }
    var c = "cloneya",
        d = {
            cloneThis: ".toclone",
            cloneButton: ".clone",
            deleteButton: ".delete",
            clonePosition: "after",
            minimum: 1,
            maximum: 999,
            valueClone: !1,
            dataClone: !1,
            deepClone: !1,
            serializeID: !0,
            ignore: "label.error",
            preserveChildCount: !1
        };
    b.prototype = {
        init: function() {
            var b = this;
            b.$elem.addClass(c + "-wrap"), b.clones.addClass(c), b.clones.data("initialCount", b.clones.length), b.$elem.on("click." + c, b.config.cloneThis + ">" + b.config.cloneButton, function(d) {
                d.preventDefault(), d.stopPropagation();
                var e = a(this).closest(b.config.cloneThis);
                b.$elem.triggerAll("clone_clone clone." + c, [e])
            }), b.$elem.on("clone." + c, function(a, c) {
                b._cloneAndAppend(c)
            }), b.$elem.on("click." + c, b.config.cloneThis + ">" + b.config.deleteButton, function(d) {
                d.preventDefault(), d.stopPropagation();
                var e = a(this).closest(b.config.cloneThis);
                b.$elem.triggerAll("clone_delete delete." + c, [e])
            }), b.$elem.on("delete." + c, function(d, e) {
                var f = e.closest(b.elem).closestChild(b.config.cloneThis).length;
                f > b.config.minimum ? (b.$elem.triggerAll("clone_before_delete before_delete." + c, [e, f]), b.$elem.triggerHandler("remove." + c, [e]), b.$elem.triggerAll("clone_after_delete after_delete." + c)) : (b.$elem.triggerHandler("minimum." + c, b.config.minimum, [e]), e.find("input, textarea, select").each(function() {
                    b._clearForm(a(this))
                }))
            }), b.$elem.on("remove." + c, function(b, c) {
                a(c).remove()
            })
        },
        _clean: function() {
            var a = this;
            a.$elem.removeClass(c + "-wrap"), a.clones.removeClass(c), a.$elem.off("click." + c, a.config.cloneThis + ">" + a.config.cloneButton), a.$elem.off("click." + c, a.config.cloneThis + ">" + a.config.deleteButton), a.$elem.off("clone_clone clone_delete clone_before_delete clone." + c + " delete." + c + " before_delete." + c)
        },
        destroy: function() {
            this._clean(), this.$elem.removeData(c)
        },
        getOption: function() {
            return this.config
        },
        setOption: function(b) {
            a.extend(this.config, b || {}), this._clean(), this.init()
        },
        _cloneAndAppend: function(a) {
            var b = a.closest(this.elem).closestChild(this.config.cloneThis).length;
            if (b < this.config.maximum) {
                this.$elem.triggerAll("clone_before_clone before_clone." + c, [a]);
                var d = this._cloneItem(a);
                this.$elem.triggerAll("clone_after_clone after_clone." + c, [a, d]), this.clones.add(d), this.$elem.triggerAll("clone_before_append before_append." + c, [a, d]), "after" !== this.config.clonePosition ? a.before(d) : a.after(d), this.config.ignore && d.find(this.config.ignore).remove(), this._redoIDs(), this.$elem.triggerAll("clone_after_append after_append." + c, [a, d])
            } else this.$elem.triggerAll("clone_limit maximum." + c, this.config.maximum, [a])
        },
        _cloneItem: function(b) {
            var d = this,
                e = b.clone({
                    withDataAndEvents: d.config.dataClone,
                    deepWithDataAndEvents: d.config.deepClone
                });
            return d.config.preserveChildCount !== !1 && e.find("." + c + "-wrap").each(function() {
                var b = a(this).closestChild("." + c),
                    d = b.data("initialCount"),
                    e = b.slice(d, b.length);
                e.remove()
            }), e.find("input, textarea, select").each(function() {
                d._clearForm(a(this)), d.$elem.triggerAll("clone_form_input form_input." + c, [a(this), b, e])
            }), e
        },
        _clearForm: function(a) {
            this.config.valueClone || a.hasClass("noEmpty") || (a.is(":checkbox") || a.is(":radio") ? a.prop("checked", !1) : a.val(""))
        },
        _redoIDs: function() {
            var b = this;
            if (b.config.serializeID === !0) {
                var c = b.$elem.find(b.config.cloneThis).first().attr("id");
                b.$elem.find(b.config.cloneThis).each(function(d) {
                    var e;
                    e = 0 !== d ? d : "", a(this).attr("id") && a(this).attr("id", c + e);
                    var f, g;
                    a(this).find("*").each(function() {
                        if (f = a(this).attr("id")) {
                            var c = f.match(b.regex);
                            c && 3 === c.length ? (g = f.replace(/\d+$/, "") + e, a(this).attr("id", g)) : (g = f + e, a(this).attr("id", g))
                        }
                        if (a(this).closest(b.config.cloneThis).find("label[for='" + f + "']").attr("for", g), b.config.serializeIndex) {
                            var h = a(this).attr("name");
                            if (h) {
                                var i = h.match(/\[([^}]+)\]/);
                                if (i && i.length >= 1) {
                                    var j = h;
                                    h = [].map.call(j, function(a, b) {
                                        return isNaN(+a) || "[" !== j[b - 1] || "]" !== j[b + 1] ? a : d
                                    }).join(""), a(this).attr("name", h)
                                }
                            }
                        }
                    })
                })
            }
        }
    }, a.fn[c] = function(d) {
        var e = arguments;
        if (void 0 === d || "object" == typeof d) return this.each(function() {
            a.data(this, c) || a.data(this, c, new b(this, d))
        });
        if ("string" == typeof d && "_" !== d[0] && "init" !== d) {
            if (0 === Array.prototype.slice.call(e, 1).length && -1 !== a.inArray(d, a.fn[c].getters)) {
                var f = a.data(this[0], c);
                return f[d].apply(f, Array.prototype.slice.call(e, 1))
            }
            return this.each(function() {
                var f = a.data(this, c);
                f instanceof b && "function" == typeof f[d] && f[d].apply(f, Array.prototype.slice.call(e, 1))
            })
        }
    }, a.fn[c].getters = ["getOption"], a.fn.closestChild = function(b) {
        var c, d;
        return c = this.children(), 0 === c.length ? a() : (d = c.filter(b), d.length > 0 ? d : c.closestChild(b))
    }, a.fn.extend({
        triggerAll: function(a, b) {
            var c, d = this,
                e = a.split(" ");
            for (c = 0; c < e.length; c += 1) d.triggerHandler(e[c], b);
            return d
        }
    })
}(jQuery);