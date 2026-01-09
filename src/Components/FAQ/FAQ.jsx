import React from 'react';
import AnimatedContent from '../AnimatedContent/AnimatedContent';
import TextType from '../TextType/TextType';

const FAQ = () => {
    const questions = [
        {
            question: "How do I track my garment order after placing it?",
            answer: "Once your order is approved by the manager, you can track it in real-time from your dashboard. Go to 'My Orders' and click the 'View' button on any order to see the complete production timeline, including stages like cutting, sewing, finishing, quality check, and shipping. You'll see detailed updates with timestamps and location information at each stage."
        },
        {
            question: "What is the minimum order quantity and how does pricing work?",
            answer: "Each product has its own minimum order quantity (MOQ). When placing an order, you must order at least the minimum quantity specified for that product. The total order price is automatically calculated based on the quantity you select. You can choose between Cash on Delivery or online payment options depending on what is enabled for that product."
        },
        {
            question: "What happens after I place an order?",
            answer: "After you submit your order, it goes to the 'Pending Orders' section where the manager reviews it. The manager can either approve or reject your order. Once approved, the production process begins and you'll receive tracking updates at each stage. You can cancel your order anytime while it's still in 'Pending' status, but once approved, cancellation is no longer available."
        },
        {
            question: "Why can't I place a new order even though I'm logged in?",
            answer: "If you're unable to place new orders, your account may have been suspended by the Authority. You can check your profile page to view the suspension reason and feedback. While suspended, you can still view your existing orders and their tracking information, but you won't be able to create new bookings until your account is reactivated."
        }
    ];
    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
            <div className='tf_heading font-playfair text-black text-3xl lg:text-[40px] font-bold text-center mb-10'>
                <TextType
                    text={"FAQs"}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    startOnVisible={true}
                    deletingSpeed={0}
                    loop={false}
                />
            </div>

            <AnimatedContent
                distance={100}
                direction="vertical"
                reverse={false}
                duration={1.2}
                ease="power3.out"
                disappearEase="power3.in"
                initialOpacity={0}
                animateOpacity={true}
                scale={1}
                threshold={0.1}
                delay={0.3}
                startOnVisible={true}>
                <div className='flex flex-col gap-5'>
                    {
                        questions.map(q => <div key={q.question} className="collapse collapse-arrow bg-white-bg border-base-300 border">
                            <input type="checkbox" />
                            <div className="collapse-title font-semibold font-playfair"><p>{q.question}</p></div>
                            <div className="collapse-content text-sm font-inter">
                              <p>{q.answer}</p>  
                            </div>
                        </div>)
                    }
                </div>

            </AnimatedContent>
        </div>
    );
};

export default FAQ;