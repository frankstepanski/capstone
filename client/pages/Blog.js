import React, { useState } from "react";

import "./Blog.css";

const Blog = () => {

  const [posts, setPosts] = useState([{}]); // array of posts

    return (
      <div className="blog">
       
        <div className = "post">
        <h1 style = 
          {{"textAlign":"center"}}>Blog
        </h1>
        <br></br>
        <h3>Heroes and Heavies: Mason Silva Article</h3>       
        <img src= "/assets/images/BlogPhotos/masonsilva_title_2x.jpg" ></img>
        <p>MASON’S ONE OF THE HEAVIEST IN THE GAME, and it makes sense once you see his list of inspirations. Read his appreciation of towering figures like Heath, Reynolds, Barbee and a few you’d never guess in this piece from our April 2020 mag.</p>

        <img src = "/assets/images/BlogPhotos/35high_MasonSilva_backsmithGrind_photoPAPKE_DZ_2000PX_2x.jpg"></img>

        <img src = "/assets/images/BlogPhotos/masonsilva_quote.jpg"></img>

        <img src = "/assets/images/BlogPhotos/masonsilva_heathkirchart_2x.jpg"></img>

        <p>“I first saw Heath in This is Skateboarding. My brother brought it home. It was one of the most different-feeling videos I’d ever seen. I was obsessed with it—the song he used and especially that it was the first time I’d ever seen a slam used in a video to start a part. To start with a slam… it just made you feel like this is a different kind of skater. From there I wanted to know everything about him. You’d hear these rumors. I heard he sometimes was more stoked on a slam than landing a trick. He was one of those guys who could make whatever he did look cool—from the hardest trick to even a slam. He’d wear either all black or all white. You’d hear legends that he would do things like hide out in the bushes at UCI and knew what everyone was trying there. And that he only skated in the middle of the night and would disappear from a session on his motorcycle without saying anything. As a kid, it sounded like he was some sort of superhero or something. He didn’t follow any trends throughout his whole skate career. He did everything perfectly and did exactly what he wanted. Not too many people can say that. He had a passion for doing it his way—simple, powerful tricks. Watching him do a lipslide made me want to lipslide everything. When I got to meet him on a trip I liked him even more. I was ready for him to be sort of aloof or a dick but instead he’s this really nice person who loves candy and shoves an iPad in his back pocket instead of owning a phone. It’s like, Of course Heath doesn’t have a phone! He does what he wants. And then when he retired from skateboarding he starts riding bikes across America. Everyone looks up to Heath.”</p>

        </div>

        <div className = "post">

        <br></br>
        <h3>Evan Smith Interview</h3>       
        <img src= "/assets/images/BlogPhotos/Smith_Intro_2_750px.jpg" ></img>
        
        <p>FOUR-BILLION YEARS AGO, errant meteorites slammed into the lifeless lump of stone that is planet Earth, sprinkling their cosmic crud like so much dandruff and sparking what would eventually become Orlando, Florida (and the rest of life as we know it), though all of that took a hell of a lot of time. It was there that a young Evan Smith picked up a skateboard toy, his instant mastery of which leads us to believe that he’d somehow absorbed a little more than his fair share of that original space gunk. Or maybe it was just concentrated in the Orlando city drinking water. Florida’s notoriously sloppy with issues of infrastructure like that. Either way, dude is out of this world. Or more specifically, he’s got a little extra-terrestrial-ity about him. He’s like us, but with a touch of something special—something weird and wonderful. Endlessly curious, freakishly good at whatever he tries, possessing relentless PMA—looks like a goddamned ET too, come to think of it. Star. Head. Body. Evan Smith, folks, live from outer space!

        What are you doing right now?
        I’m in Pittsburgh and I just got done unpacking and now I’m repacking.

        Where’d you go? Where are you going next?
        This year has been fucking mental. I’ve been all over the globe, which is such an awesome experience. We went to Barcelona for a month, we went to Australia, went to South America multiple times, just went to Brazil with DC. The reason why we’ve been traveling so much is because Element is making a video and I’m trying to put out a Thrasher part in January. With the combination of those two things, I’ve been going nonstop.

        Dude, that’s crazy.
        So I just unpacked and then I’m going to repack and I’m going to leave on the fourth to Minneapolis and Australia, then come back for the holidays and then I’m gonna go to Costa Rica and then in January I’m throwing a party in LA.

        What kind of party? What’s the occasion?
        I’m releasing a shoe, so I’m gonna try to throw a party for it for all my friends. Because it’s cool that I’m getting a shoe and all, but I wanna give something back to all my buddies so they can have a place and a time to enjoy it together and hopefully use it as an opportunity to bring people like you and Cole and Dave Hoang and all my closest friends in the industry together to celebrate our existence!</p>

        <img src = "/assets/images/BlogPhotos/Smith_1_750px.jpg"></img>

        </div>

        <div className = "post">
        <br></br>
        <h3>No Play in Taipei</h3>    

        <img src= "/assets/images/BlogPhotos/Karsten_Kleppan_Fr_Smith_Sharpened_AdobeRGB_8461_DZ.jpg" ></img>
        <p>BY NOW YOU’VE UNDOUBTEDLY HEARD TALES of the numerous, uncharted virgin ledges in China. Supposedly they’re everywhere— as far as they eye can see. Those mythical, marble structures are what initially spawned this mission to Taiwan. Although once there, we found there was all sorts of architectural amusements to entertain ourselves with, not just the 90-degree variety. Minds were opened and spots were desecrated as we made our way through the east-Asian state. And by “we,” I mean: Patrik Wallner (videographer), Kenji (Japanese friend and tour guide), Tommy Zhao (second-angle filmer), DVL (photographer) and six guys that skate for Element. You can just reference the photos to get those names.</p>

        <img src = "/assets/images/BlogPhotos/Keelung_8243.jpg"></img>

        <img src = "/assets/images/BlogPhotos/Trent_McClung_Fr_Noseblunt_Sharpened_AdobeRGB_4524_DZ.jpg"></img>

        <h3>"MINDS WERE OPENED AND SPOTS WERE DESECRATED"</h3>
        <img src = "/assets/images/BlogPhotos/Nick_Garcia_Bs_360_Sharpened_AdobeRGB_5357_B&W_DZ.jpg"></img>

        <p>Taiwan is similar to, but definitely not, mainland China. The official name of the country is the Republic of China, which is different from that of the People’s Republic of China, the old empire we all know. If the Taiwanese island would ever try to become independent and rename themselves the Taiwan Republic, China would take it over like Russia took over Crimea. Although China influences the island significantly, it is certainly a whole different culture. Taiwan is much cleaner than China; it seems like a more advanced country with better food to eat and faster trains to ride. To our Western minds, it’s hard to comprehend the lifestyle of an average Asian person: they work the longest hours in the world and sleep the least. As weird as it seems, this hectic schedule makes it perfectly normal for a married couple to cheat on each other with their coworkers. Get in when you fit in, I suppose. An often-recurring phrase in Taiwan is, “No time to play.” For the Taiwanese, anything outside of work is considered play: going to a bar, watching a movie, hitting a tennis ball around. Life consists of work, eat, sleep and play. Every security guard we encountered shouted the same phrase at us: “No play! No play!” As travelling skateboarders, our entire existence was strictly play: no arranged schedule, no obligations and no real responsibilities (besides landing tricks). It was just 100-percent play all day—every day.</p>

        <img src="/assets/images/BlogPhotos/Nick_Garcia_Ollie_Over_Into_Bank_Sharpened_AdobeRGB_5030_DZ.jpg"></img>

        </div>
        


      </div>
    );
  };


export default Blog;