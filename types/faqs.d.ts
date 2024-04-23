type FAQ = {
    id: number;
    question: string;
    answer: string;
    active?: boolean;
    created_at?: string;
    updated_at?: string;
    category?: {
        id: number;
        name: string;
    };
};

export type FAQs = FAQ[];
