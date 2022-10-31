//Copyright Daniel Rooke 05/10/2022
function danjsVersion(){
    return "0.2";
}
function danCreateElement(elmType, id, classes, text){
    if(!elmType)  return null;
    var elm = document.createElement(elmType);
    if(id)    elm.id = id;
    if(text)    elm.innerText = text;
    if(classes)    elm.classList = classes;
    return elm;
}
function danLoadElement(parent, elm){
    if(parent && elm)
    parent.appendChild(elm);
}
function danUnloadChild(parent, elm){
    if(parent && elm){
        parent.removeChild(elm);
    }
}
function danUnloadElement(elm){
    if(elm)
    while(elm.firstChild){
        elm.removeChild(elm.lastChild);
    }
}
//Add classes to element
function danAddClass(elm, classes){
    if(elm && classes)
    elm.classList = elm.classList + " " + classes;
}
//Remove classes from element
function danRemoveClass(elm, classes){
    if(elm && classes){
        var rclasses = classes.split(" ");
        for(const r in rclasses){
            elm.classList.remove(rclasses[r]);
        }
    }
}
//Check whether or not a class is present in an element
function danHasClass(elm, classes){
    if(elm){
        console.log(elm.classList);
        var goodVal = false;
        elm.classList.forEach(
            function (value, key, listObj) {
                console.log(String(value));
                console.log(classes)
                if(String(value) == classes){
                    console.log('classes match')
                    goodVal = true;
                }
            }
        );
        return goodVal;
    }
}

//VDOM object
class Delement{
    //Create Delement with tag name, id, classes, text.
    constructor(tag, id, classes, text){
        this.tag = tag;
        this.id = id;
        this.classes = classes;
        this.text = text;
        this.sibling = null;
        this.child = null;
        this.parent = null;
        this.pid = null;
        this.isLoaded = false;
        this.obj = danCreateElement(this.tag, this.id, this.classes, this.text);
        this.onLoad = null;
        this.onUnload = null;
    }
    //Create a loading point for main app if not using a body tag.
    attach(){
        this.pid = 'body';
    }
    //Load and make visible the element and it's children, and siblings.
    load(){
        if(!this.isLoaded){
            if(this.pid === null && this.tag === 'body'){
                console.log("loading body");
                document.body = this.obj;
                this.isLoaded = true;
            }
            else if(this.pid === 'body'){
                console.log("loading body child");
                danLoadElement(document.body, this.obj);
                this.isLoaded = true;
            }
            else{
                console.log("loading other child" + this.pid + "=>" + this.obj.id);
                danLoadElement(this.parent.obj, this.obj);
                this.isLoaded = true;
            }
        }
        
        if(this.child){
            this.child.load();
        }
        if(this.sibling){
            this.sibling.load();
        }
        if(this.onLoad){
            this.onLoad();
        }
    }
    //Unload this and it's children.
    unload(){
        if(this.onUnload){
            this.onUnload();
        }
        if(this.isLoaded){
            //this.parent.obj.removeChild(this.obj);
            danUnloadChild(this.parent.obj, this.obj);
        }
        var t = this, e = this.peekNext();
        while(t != e){
            t.isLoaded = false;
            t = t.getNext();
        }        
    }
    //Add child to Delement.
    addChild(elm){
        if(elm){
            if(this.child){
                console.log('adding child sibling');
                var t = this.child.addSibling(elm);
            }
            else{
                console.log("adding first child");
                this.child = elm;
                elm.parent = this;
                elm.pid = this.id;
            }
            if(this.isLoaded){
                elm.load();
            }
        }
        return elm;
    }
    //Delete child and it's children.
    removeChild(elm){
        if(elm){
            var t = this.child, tt = null;
            while(t !== elm && t !== null){
                tt = t;
                t = t.sibling;
            }
            if(t !== null && t === elm){
                elm.unload();
                if(t === this.child){
                    this.child = t.sibling;
                }
                else{
                    tt.sibling = t.sibling;
                }
            }
        }
    }
    //Remove all children of this element.
    removeChildren(){
        var t  = this.child;
        while(t){
            this.removeChild(t);
            t  = this.child;
        }
    }
    //Add sibling, will share the same parent.
    addSibling(elm){
        if(elm){
            var t = this.sibling;
            if(this.sibling){
                while(t.sibling){
                    t = t.sibling;
                }
                elm.parent = t.parent;
                elm.pid = t.pid;
                t.sibling = elm;
            }
            else{
                elm.parent = this.parent;
                elm.pid = this.pid;
                this.sibling = elm;
            }
        }
        return elm;
    }
    //Delete a sibling of this, cannot be this.
    removeSibling(elm){
        if(elm){
            var t = this.sibling, tt = null;
            while(t){
                tt = t;
                if(t === elm){
                    break;
                }
                t = t.sibling;
            }
            if(t === elm){
                t.unload();
                tt.sibling = t.sibling
            }
        }
    }
    //Return element with id (elm).
    getID(elm){
        if(elm){
            var t = this;
            while(t){
                if(t.id === elm){
                    return t;
                }
                t = t.getNext();
            }
        }
        return null;
    }
    //Return the next element to be checked.
    getNext(){
        if(this.child){
            return this.child;
        }
        if(this.sibling){
            return this.sibling;
        }
        var t = this;
        while(t.parent){
            if(t.parent.sibling){
                return t.parent.sibling;
            }
            t = t.parent;
        }
        if(t.parent === null){
            return t.sibling;
        }
        return null;
    }
    //Returns what would be the next iteration after checking all children.
    peekNext(){
        if(this.sibling){
            return this.sibling;
        }
        var t = this;
        while(t.parent){
            if(t.parent.sibling){
                return t.parent.sibling;
            }
            t = t.parent;
        }
        if(t.parent === null){
            return t.sibling;
        }
        return null;
    }
}