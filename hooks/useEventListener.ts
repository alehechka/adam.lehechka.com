import { useEffect, useRef } from 'react';

const useEventListener = (eventType: string, callback: (e: Event) => void, element: any) => {
	const callbackRef = useRef<any>(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const target = element || window;
		if (target == null) return;
		const handler: EventListenerOrEventListenerObject = (e) => callbackRef.current(e);
		target.addEventListener(eventType, handler);

		return () => target.removeEventListener(eventType, handler);
	}, [eventType, element]);
};

export default useEventListener;
