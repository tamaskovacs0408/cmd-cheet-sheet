import { Suspense, type ReactNode } from "react";

export default function SuspenseWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className='loading-skeleton'>
          <div className='loading-skeleton__pulse' />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}