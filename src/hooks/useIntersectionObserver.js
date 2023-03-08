import { useState, useEffect } from "react";


export const useIntersectionObserver = () => {
    const [converge, setConverge] = useState(false);

    useEffect(() => {}, [converge]);

    function executeJob(entries){
        if(entries[0].isIntersecting) {
        setConverge(true);
      }
    }

    function createScrollObserver() {
      const options = {
        threshold: 0,
        root:null,
      }
      return new IntersectionObserver(executeJob, options);
    }

    function createInfiniteScroll(card, ref, status){
      if(status === 'loading') return;
      if(ref) ref.disconnect();
      ref = createScrollObserver()
      if(card) ref.observe(card);
    }

    return {
      createInfiniteScroll,
      converge,
      setConverge,
    };
}