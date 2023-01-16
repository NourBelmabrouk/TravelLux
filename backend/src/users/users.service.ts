import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from "prom-client";
import { LokiLogger } from 'nestjs-loki-logger';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService,
    @InjectMetric("http_request_total") public counter: Counter<string>
  ) {}
  
  lokiLogger = new LokiLogger(UsersService.name) 

  async create(createUserDto: CreateUserDto) {
    try{
      const token = Math.floor(
        1000000000 + Math.random() * 9000000000,
      ).toString();
      if (
        await User.findOne({
          where: {
            email: createUserDto.email,
          },
        })
      ) {
        return "user already registred "
      }
      this.counter.labels({route:"users", statusCode: "200"}).inc()
      const user = User.create(createUserDto);
      user.accountToken = token;
      user.accountActivated = false;
      await this.mailService.sendUserConfirmation(user, token);
      await user.save();

      delete user.password;
      return user;
    }catch(e) {
      this.counter.labels({route:"users", statusCode: "400"}).inc()
      throw new BadRequestException("Could not add user by request")
    }
  }

  async activateAccount(token: String) {
    this.usersRepository.update(
      { accountToken: token },
      { accountActivated: true },
    );
    return 'User registred and Activated';
  }

  async showById(id: number): Promise<User> {
    try{
      const user = await this.findById(id);

      delete user.password;
      this.counter.labels({route:"users", statusCode: "200"}).inc()
      return user;
    }catch(e){
      this.counter.labels({route:"users", statusCode: "400"}).inc()
      throw new NotFoundException("User Not found")
    }
  }
    

  async findById(id: number) {
    // return await User.findOne(id);
    try{
      const user = await User.findOne(id);
      this.counter.labels({route:"users", statusCode: "200"}).inc()
      return user;
    }catch(e){
      this.counter.labels({route:"users", statusCode: "400"}).inc()
      throw new NotFoundException("User Not found")
    }
  }

  async findByEmail(email: string) {
    // return await User.findOne({
    //   where: {
    //     email: email,
    //   },
    // });

    try{
      const user = await User.findOne({ email });
      this.counter.labels({route:"users", statusCode: "200"}).inc()
      return user;
    }catch(e){
      this.counter.labels({route:"users", statusCode: "400"}).inc()
      throw new NotFoundException("User Not found")
    }
  }

  async showByEmail(email: string) {
    try{
      const user =  await User.findOne({
        where: {
          email: email,
        },
      });
      delete user.password;
      delete user.id;
      delete user.updatedAt;
      delete user.createdAt;
      delete user.accountActivated;
      delete user.accountToken;

      this.counter.labels({route:"users", statusCode: "200"}).inc()

      return user ;
    }catch(e){
      this.counter.labels({route:"users", statusCode: "400"}).inc()
      throw new NotFoundException("User Not found")
    }
  }
}
