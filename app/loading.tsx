
export default function Loading() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }