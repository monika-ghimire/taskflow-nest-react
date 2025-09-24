import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Constants } from "src/utils/constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    // Check if the request URL should bypass the guard
    for (let x = 0; x < Constants.BY_PASS_URLS.length; x++) {
      if (request.url.includes(Constants.BY_PASS_URLS[x])) {
        return true; // bypass JWT check
      }
    }

    // If not bypassed, use the default JWT guard
    return super.canActivate(context) as Promise<boolean>;
  }
}
