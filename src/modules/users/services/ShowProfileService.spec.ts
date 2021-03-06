import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';


let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  })

  it('should be able to show the profile' , async () => {
  
    const user = await fakeUsersRepository.create({
      name: 'JoJo',
      email: 'jojo@gmail.com',
      password: '123123'
     });
 
     const profile = await showProfile.execute({
      user_id: user.id,
     });
     
     expect(profile.name).toBe('JoJo');
     expect(profile.email).toBe('jojo@gmail.com');
  
  });

  it('should be not able to show the profile from non-existing user' , async () => {
  
     expect(showProfile.execute({
      user_id: 'non-existing-user-id',
     })).rejects.toBeInstanceOf(AppError);
    
  });



})