// nocontext hotlink - gerhuyy's edit
// coded by /u/iGGNoRe

function node(selector, options, text){
    if(selector === undefined){
        return this.top;
    }
    try{
        element = document.createElement(selector); //object works in `createElement`
    }
    catch(e){try{
        element = selector(); //object is a function returning a node
    }
    catch(e){
        element = selector; //object is a node 
    }}
    for(item in options){
        element[item] = options[item];
    }
    if(text !== undefined){
        element.innerHTML += text
    }
    var self = {recent: element, top: element}
    if(this.recent !== undefined && this.recent.nodeType !== undefined){
        this.recent.appendChild(element);
        self.top = this.top
    }
    
    return function(){
        return node.apply(self, arguments);
    }
}

function addToPost(posts, name, genContent){
    var post, i;
    for(i = 0; i<posts.length; i++){
        post = posts[i];
        if (!post.classList.contains('shareddit') && !post.getElementsByClassName('sponsored-tagline').length && post.getElementsByClassName('title').length){
            post.getElementsByClassName('flat-list')[0].appendChild(genContent(post));
            post.className += " " + name;
        }
    }
}

function addToComment(comments, name, genContent){
    var i, comment, comment_id;
    for(var i = 0; i < comments.length; i++){
        comment = comments[i]
        if(!comment.classList.contains(name)){
            comment.getElementsByClassName('flat-list')[0].appendChild(genContent(comment));
            comment.className += " " + name;
        }
    }
}

function checkDocumentHeight(callback) {
    var lastHeight = document.body.clientHeight, newHeight, timer;

    (function run() {
        newHeight = document.body.clientHeight;
        if (lastHeight !== newHeight) {
            callback();
        }
        lastHeight = newHeight;
        timer = setTimeout(run, 200);
    }());

}

sharableSubs = {
    bestof: function(user, title){
        return user + " [DESCRIPTION]";
    },
    nocontext: function(user, title){
        return title;
    },
    retiredgif: function(user, title){
        return user + " retires [GIF]";
    },
};

function shareddit() {

    var comm = $('.id-' + this.name)[0];

    var permalink = comm.getElementsByClassName('bylink')[0].getAttribute('href');
    permalink = permalink.replace('www.', 'np.');

    var title = comm.getElementsByClassName('md')[0].textContent;
    title = encodeURIComponent(title);

    var user = '/u/' + comm.getElementsByClassName('author')[0].textContent;

    var sub = '';

    if (!this.value) {
        return false;
    }
    if(sharableSubs[this.value] !== undefined){
        title = sharableSubs[this.value](user, title);
        sub = this.value
    } else if (this.value === 'other') {
        sub = prompt('Where would you like to share this?', '/r/');
        sub = sub.split('/');
        sub = sub[sub.length - 1];

        title = user + " said " + title;

        if (!sub.trim().length) {
            return false;
        }
    }

    var context = prompt('How many parent comments to include for context?', 1);
    
    if (context === undefined){ //The user pressed 'cancel'. Presumably they misclicked on one of the options and don't want to share
        return
    }
    if (context < 0 || context === '' || context === null) {

        context = 0;

    }

    var dest = '//www.reddit.com/r/' + sub + '/submit?title=' + title + '&url=' + permalink + '?context=' + context;
    window.location = dest;

}

function generateShareDrop() {
    var comm = $('.id-' + this.name)[0],
        id,
        drop;
    if (!comm.classList.contains('shareddit-drop')) {

        id = comm.getAttribute('data-fullname');

        drop = node("select", {name:id, onclick: shareddit})

        drop("option", {value: "", selected:""}, "-- Select Destination --");
        for(sub in sharableSubs){
            drop("option", {value: sub}, "/r/" + sub);
        }
        drop("option", {value: "other"}, "other...");

        comm.getElementsByClassName('flat-list')[0].appendChild(drop());

        comm.className += " shareddit-drop";

        this.remove();

    }

}

function genShareLink(comment){
   return node("li")("a", {name:comment.getAttribute('data-fullname'),
                           onclick: generateShareDrop,
                           href: "javascript:void(0)"},
                    "shareddit")();
}
function genXPost(post){
    var listingTitle = post.getElementsByTagName('a')[0].innerHTML,
        listingLink = post.getElementsByTagName('a')[0].getAttribute('href'),
        listingSub = post.getElementsByClassName('comments')[0].getAttribute("href").split('/');
    console.log(listingTitle, listingLink, listingSub)
    if (listingLink.split('/')[1] === 'r') {
        if (document.URL.split(':')[0] === 'https') {
            listingLink = "https://www.reddit.com" + listingLink;
        } else {
            listingLink = "http://www.reddit.com" + listingLink;
        }
    }

    listingLink = encodeURIComponent(listingLink);

    listingSub = "/r/" + listingSub[listingSub.indexOf('r') + 1];

    listingTitle = encodeURIComponent(listingTitle + " (x-post " + listingSub + ")");
    return node("li", {id:"first",classList:"first"})("a", {href:"//www.reddit.com/submit?title=" + listingTitle + "&url=" + listingLink + "/"}, "x-post this link")();
}

function main() {
    addToPost($('.entry'), "shareddit", genXPost)
    addToComment($('.comment'), "shareddit", genShareLink)
}

var $ = document.querySelectorAll.bind(document);

"(http|https)://www.reddit.com/submit(?.+|#.*|)$"

if (document.URL.split('?')[0].split(':')[1] === '//www.reddit.com/submit') {

    $('#url')[0].value = $('#url')[0].value.substr(0, $('#url')[0].value.length - 8);

} else {

    main();
    checkDocumentHeight(main);

}
