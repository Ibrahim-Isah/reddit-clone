import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Community {
    id: string;
    creatorId: string;
    name: string;
    numberOfMembers: number;
    privacyType: 'public' | 'private' | 'restricted';
    createdAt?: Timestamp;
    imageURL?: string;
}

export interface CommunitySnippet {
    communityId: string;
    isModerator?: boolean;
    imageURL?: string;
}

interface CommunityState {
    mySnippets: CommunitySnippet[];
    currentCommunity?: Community;
}

const defaultCommunityState: CommunityState = {
    mySnippets: [],
    
};

export const communityState = atom<CommunityState>({
    key: 'communitiesState',
    default: defaultCommunityState,

})