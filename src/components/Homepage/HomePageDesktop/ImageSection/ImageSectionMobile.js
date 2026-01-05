import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imageone from '../../../../images/imagesectionone.jpg';
import imagetwo from '../../../../images/imagesectiontwo.jpg';
import imagethree from '../../../../images/imagesectionthree.jpg';

gsap.registerPlugin(ScrollTrigger);

function ImageSectionMobile() {
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
    <div className="md:hidden px-2">
      <img
        ref={image1Ref}
        src={imageone}
        loading="lazy"
        decoding="async"
        className="h-[30rem] w-[17rem] ml-28 object-cover"
        alt="img"
      />
      <img
        ref={image3Ref}
        src={imagethree}
        loading="lazy"
        decoding="async"
        className="h-[30rem] w-[17rem] object-cover"
        alt="img"
      />
      <img
        ref={image2Ref}
        src={imagetwo}
        loading="lazy"
        decoding="async"
        className="h-[33rem] w-[30rem] mb-10 object-cover"
        alt="img"
      />
    </div>
  );
}

export default ImageSectionMobile;
