import { 
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ComponentHead from '../ComponentHead'
const faqData = [
    {
        id: 1,
        que: "What services do your astrologers provide?",
        ans: "Our astrologers offer a range of services including birth chart analysis, horoscope readings, compatibility assessments, and personalized consultations."
    },
    {
        id: 2,
        que: "What services do your astrologers provide?",
        ans: "Our astrologers offer a range of services including birth chart analysis, horoscope readings, compatibility assessments, and personalized consultations."
    },
    {
        id: 3,
        que: "What services do your astrologers provide?",
        ans: "Our astrologers offer a range of services including birth chart analysis, horoscope readings, compatibility assessments, and personalized consultations."
    },
    {
        id: 4,
        que: "What services do your astrologers provide?",
        ans: "Our astrologers offer a range of services including birth chart analysis, horoscope readings, compatibility assessments, and personalized consultations."
    },
    {
        id: 5,
        que: "What services do your astrologers provide?",
        ans: "Our astrologers offer a range of services including birth chart analysis, horoscope readings, compatibility assessments, and personalized consultations."
    },

]
const Faq = () => {
    return (
        <section className="pt-0">
            <div className="container">
                <ComponentHead className="text-start mb-5"
                    heading='Frequently Asked Questions'
                    title=' Find answers to common questions about our astrology services and consultations.'
                />
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    {faqData.map(faq =>

                        <AccordionItem value={`item-${faq.id}`}>
                            <AccordionTrigger className={" cursor-pointer font-semibold text-xl"}>{faq.que}</AccordionTrigger>
                            <AccordionContent>
                                {faq.ans}
                            </AccordionContent>
                        </AccordionItem>
                    )}
                </Accordion>

            </div>
        </section>
    )
}

export default Faq
