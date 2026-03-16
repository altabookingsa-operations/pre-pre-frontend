'use client';

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SessionUID() {
  useEffect(() => {
    // Check if UID exists in sessionStorage
    if (typeof window !== 'undefined') {
      const existingUID = sessionStorage.getItem('uid');

      if (!existingUID) {
        // Generate a new UUID
        const newUID = uuidv4();
        sessionStorage.setItem('uid', newUID);
        console.log('New session UID created:', newUID);
      } else {
        console.log('Existing session UID:', existingUID);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
