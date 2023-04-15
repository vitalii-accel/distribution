import { forwardRef, Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { AuthService } from '../auth/auth.service';
import { GrantTypes } from '../enums/grant-types.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '../Schemas/Account.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  findByKommoId(kommoId: number): Promise<Account> {
    return this.accountModel.findOne({ kommoId });
  }

  async create(data: Partial<Account>): Promise<Account> {
    const candidate = await this.findByKommoId(data.kommoId);

    if (candidate) {
      return candidate;
    }

    return this.accountModel.create(data);
  }

  async update(kommoId: number, data: Partial<Account>) {
    await this.accountModel.updateOne({ kommoId }, data);
    return this.findByKommoId(kommoId);
  }

  createConnector(kommoId: number): AxiosInstance {
    const api = axios.create();
    let account: Account;

    api.interceptors.request.use(
      async (config) => {
        if (!account) account = await this.findByKommoId(kommoId);
        const { oauth } = account;

        if (oauth.expire - 60 * 1000 < Number(new Date())) {
          account = await this.update(account.kommoId, {
            oauth: await this.authService.getNewToken(
              oauth.refreshToken,
              account.domain,
              GrantTypes.RefreshToken,
            ),
          });
        }

        config.baseURL = `https://${account.domain}`;
        config.headers.Authorization = `Bearer ${account.oauth.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error),
    );

    return api;
  }
}
