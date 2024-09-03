"use client";

import { useCallback, useEffect, useState } from "react";

export default function Age() {
  const calculateAge = useCallback(() => {
    const ageDate = new Date(Date.now() - new Date(2003, 1, 15).getTime());
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }, []);

  const [age, setAge] = useState<number>(calculateAge());

  useEffect(() => {
    setAge(calculateAge());
  }, [calculateAge]);

  return age;
}
