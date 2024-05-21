 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 function onYouTubeIframeAPIReady() {
 new YT.Player('player', {
     videoId: 'YxK7me1EsUg',
     playerVars:
     {
        autoplay: true,
        loop: true,
        playlist: 'YxK7me1EsUg'
     },
     events: {
        onReady: function(event)
        {
            event.target.mute()
        }
     }
   });
 }

 gsap.to('.floating1',1.5,
 {
    delay: 1,
    y: 15,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut
 });

 gsap.to('.floating2',1.5,
 {
    delay: 1,
    y:20,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut
 });

 gsap.to('.floating3',1.5,
 {
    delay: 1,
    x: 30,
    y: 15,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut
 });

 const spyEls = document.querySelectorAll('section.scroll-spy');
 spyEls.forEach(function(spyEl)
 {
    new ScrollMagic
    .Scene
    ({
        triggerElement: spyEl,
        triggerHook: .8
    })
    .setClassToggle(spyEl,'show')
    .addTo(new ScrollMagic.Controller())
 });