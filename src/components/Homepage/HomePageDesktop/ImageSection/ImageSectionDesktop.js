import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imageone from '../../../../images/imagesectionone.jpg';
import imagetwo from '../../../../images/imagesectiontwo.jpg';
import imagethree from '../../../../images/imagesectionthree.jpg';

gsap.registerPlugin(ScrollTrigger);

function ImageSectionDesktop() {
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);

  useEffect(() => {
    const images = [
      { ref: image1Ref, y: 80 },
      { ref: image2Ref, y: 40 },
      { ref: image3Ref, y: 80 },
    ];

    images.forEach(({ ref, y }) => {
      gsap.fromTo(
        ref.current,
        { y: 0 },
        {
          y: y,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="hidden space-x-2 lg:flex justify-between space-x-0 px-4 overflow-hidden">
      <img
        ref={image1Ref}
        src={imageone}
        className="h-[32rem] w-[27rem] pt-24"
        alt="img"
      />
      <img
        ref={image2Ref}
        src={imagetwo}
        className="h-[60rem] w-[50rem]"
        alt="img"
      />
      <img
        ref={image3Ref}
        src={imagethree}
        className="h-[32rem] w-[27rem] mt-80"
        alt="img"
      />
    </div>
  );
}

export default ImageSectionDesktop;
