import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthCallbackQuery } from '../interfaces/auth-callback-query.interface';
import { GrantTypes } from '../enums/grant-types.enum';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { AccountsService } from '../accounts/accounts.service';
import { OAuthField } from '../interfaces/oauth-field.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @Inject(forwardRef(() => AccountsService))
    private accountsService: AccountsService,
  ) {}

  async performCallback(query: AuthCallbackQuery): Promise<string> {
    const oauth: OAuthField = await this.getNewToken(query.code, query.referer);
    const decoded = jwt.decode(oauth.accessToken, { json: true });
    const account = await this.accountsService.findByKommoId(
      decoded.account_id,
    );
    if (!account) {
      await this.accountsService.create({
        kommoId: decoded.account_id,
        domain: query.referer,
        oauth,
      });
    } else {
      await this.accountsService.update(account.kommoId, {
        domain: query.referer,
        oauth,
      });
    }

    return `https://${query.referer}/settings/widgets`;
  }

  async getNewToken(
    i: string,
    domain: string,
    type: GrantTypes = GrantTypes.AuthCode,
  ) {
    const { data } = await axios.post<{
      token_type: string;
      access_token: string;
      refresh_token: string;
      expires_in: number;
    }>(
      `https://${domain}/oauth2/access_token`,
      {
        client_id: this.configService.get('clientId'),
        client_secret: this.configService.get('clientSecret'),
        redirect_uri: this.configService.get('redirectUri'),
        grant_type: type,
        [type === GrantTypes.AuthCode ? 'code' : 'refresh_token']: i,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expire: Number(new Date()) + data.expires_in * 1000,
    };
  }
}
