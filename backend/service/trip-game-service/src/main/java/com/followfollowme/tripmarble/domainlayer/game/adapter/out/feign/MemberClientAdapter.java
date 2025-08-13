package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client.MemberClient;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.MemberProfileInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.MemberClientPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberClientAdapter implements MemberClientPort {

    private final MemberClient memberClient;

    @Override
    public List<MemberProfileInternalResponse> getMemberProfiles(List<Long> memberIds) {
        return memberClient.getMemberProfiles(memberIds);
    }
}
