import profileReducer, {addPostAC, deletePost, ProfilePageType, setStatus, setUserProfile} from '../profile-reducer';
import {ContactsType, PhotosType, ProfileUserType} from '../../../api/api';

let initialState: ProfilePageType

beforeEach(() => {
    initialState = {
        posts: [
            {id: 1, message: 'first text', likesCount: 3},
            {id: 2, message: 'second text', likesCount: 5},
            {id: 3, message: 'third text', likesCount: 1}
        ],
        // profile: null,
        profile: {} as ProfileUserType,
        status: null
    }
})

test('length of the posts should be incremented by one', () => {
    const action = addPostAC('new message')
    const newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(4)
})

test('profile should be filled', () => {
    const userProfile: ProfileUserType = {
        aboutMe: null,
        contacts: {} as ContactsType,
        fullName: 'Full name',
        lookingForAJob: false,
        lookingForAJobDescription: 'desc',
        photos: {} as PhotosType,
        userId: 1
    }

    const action = setUserProfile(userProfile)
    const newState = profileReducer(initialState, action)

    expect(newState.profile).toBe(userProfile)
})

test('text for status should be added', () => {
    const action = setStatus('new status')
    const newState = profileReducer(initialState, action)

    expect(newState.status).toBe('new status')
})

test('length of the posts should be decremented by one', () => {
    const action = deletePost(2)
    const newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(2)
})