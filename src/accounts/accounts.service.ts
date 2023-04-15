import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { Account } from './account.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccountsService {
  constructor(
    // @InjectRepository(Account) private accountsRepository: Repository<Account>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  // async onModuleInit() {
  //   // const api = this.createConnector(31111283);
  //   // const { data } = await api.get('/api/v4/account');
  // }
  //
  // findByKommoId(kommoId: number): Promise<Account> {
  //   return this.accountsRepository.findOne({ where: { kommoId } });
  // }
  //
  // create(data: Partial<Account>): Promise<Account> {
  //   return this.accountsRepository.save(data);
  // }
  //
  // async update(id: number, data: Partial<Account>) {
  //   await this.accountsRepository.save({ ...data, id });
  //   return this.accountsRepository.findOneBy({ id });
  // }
  //
  // createConnector(kommoId: number): AxiosInstance {
  //   const api = axios.create();
  //   let account: Account;
  //
  //   api.interceptors.request.use(
  //     async (config) => {
  //       if (!account) account = await this.findByKommoId(kommoId);
  //       const { oauth } = account;
  //
  //       if (oauth.expire - 60 * 1000 < Number(new Date())) {
  //         account = await this.update(account.id, {
  //           oauth: await this.authService.getNewToken(
  //             oauth.refreshToken,
  //             account.domain,
  //             GrantTypes.RefreshToken,
  //           ),
  //         });
  //       }
  //
  //       config.baseURL = `https://${account.domain}`;
  //       config.headers.Authorization = `Bearer ${account.oauth.accessToken}`;
  //       return config;
  //     },
  //     (error) => Promise.reject(error),
  //   );
  //
  //   return api;
  // }
}
