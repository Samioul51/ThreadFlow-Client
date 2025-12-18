import React from 'react';
import styled from 'styled-components';
import Review from '../Review/Review';
import TextType from '../TextType/TextType';

const reviews = [
  {
    id: "1",
    name: "John Davis",
    rev: "ThreadFlow has revolutionized how we manage our garment orders. The tracking system is incredibly intuitive and saves us hours every week."
  },
  {
    id: "2",
    name: "Sarah Kim",
    rev: "The quality of products and the seamless ordering process make ThreadFlow our go-to platform for all garment procurement needs."
  },
  {
    id: "3",
    name: "Michael Park",
    rev: "Exceptional service and transparency. Being able to track every stage of production gives us complete peace of mind."
  },
  {
    id: "4",
    name: "Lisa Wang",
    rev: "Outstanding platform! The real-time updates and user-friendly interface have transformed our workflow completely."
  },
  {
    id: "5",
    name: "Robert Johnson",
    rev: "We've seen a 40% improvement in delivery times since switching to ThreadFlow. Highly recommend for any garment business!"
  },
];

const Reviews = () => {
  return (
    <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
      <div className='tf_heading font-playfair text-black text-3xl lg:text-[40px] font-bold text-center mb-10'>
        <TextType
          text={"Our Customers"}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={false}
          startOnVisible={true}
          deletingSpeed={0}
          loop={false}
        />

      </div>
      <StyledWrapper
        style={{
          '--width': '400px',
          '--height': '200px',
          '--quantity': reviews.length
        }}
      >
        <div className="slider">
          <div className="list">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="item"
                style={{ '--position': index + 1 }}
              >
                <Review review={review} />
              </div>
            ))}
          </div>
        </div>
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.div`
  .slider {
    width: 100%;
    height: var(--height);
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
  }

  .slider .list {
    display: flex;
    width: 100%;
    min-width: calc(var(--width) * var(--quantity));
    position: relative;
  }

  .slider .list .item {
    width: var(--width);
    height: var(--height);
    position: absolute;
    left: 100%;
    animation: autoRun 20s linear infinite;
    transition: filter 0.5s;
    animation-delay: calc((20s / var(--quantity)) * (var(--position) - 1) - 10s) !important;
  }

  @keyframes autoRun {
    from {
      left: 100%;
    }
    to {
      left: calc(var(--width) * -1);
    }
  }

  .slider:hover .item {
    animation-play-state: paused !important;
    filter: grayscale(1);
  }

  .slider .item:hover {
    filter: grayscale(0);
  }

  .slider[reverse="true"] .item {
    animation: reversePlay 10s linear infinite;
  }

  @keyframes reversePlay {
    from {
      left: calc(var(--width) * -1);
    }
    to {
      left: 100%;
    }
  }
`;

export default Reviews;