package com.followfollowme.tripmarble.core.auth.application.port.in;

import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.core.auth.application.command.AuthLoginCommand;

public interface AuthUseCase {

    AuthLoginResponse loginAuth(AuthLoginCommand command);
}
