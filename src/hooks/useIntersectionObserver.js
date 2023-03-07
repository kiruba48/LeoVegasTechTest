import { useState, useEffect } from "react";


export const useIntersectionObserver = () => {
    const [converge, setConverge] = useState(false);

    useEffect(() => {}, [converge]);

    function executeJob(entries){
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          setConverge(true);
        }
      })
    }

    function createScrollObserver() {
      const options = {
        threshold: 0,
        root:null,
      }

      return new IntersectionObserver(executeJob, options);
    }

    
    return {
      createScrollObserver,
      converge,
      setConverge,
    };
}