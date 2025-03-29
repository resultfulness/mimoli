export type LearnSetOverview = {
	name: string;
	id: number;
};

export type LearnCard = {
	front: string;
	back: string;
}

export type LearnSet = LearnSetOverview & {
	cards: LearnCard[];
} 
