import { Linkedin, Github, Globe } from 'lucide-react';

import { team } from '../data/team';
import { useStore } from '../store/useStore';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';

function TeamMemberModalContent({ memberId }: { memberId: string }) {
    const member = team.find((m) => m.id === memberId);

    if (!member) return null;

    return (
        <div className="team-modal">
            <img
                src={member.photo}
                alt={member.name}
                className="team-modal__photo"
            />

            <h2>{member.name}</h2>
            <p>{member.role}</p>

            {member.skills && member.skills.length > 0 && (
                <ul className="team-modal__skills">
                    {member.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            )}

            <div className="team-modal__socials">
                {member.socials?.linkedin && (
                    <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`LinkedIn de ${member.name}`}
                        className="social-icon social-icon--linkedin"
                    >
                        <Linkedin size={22} />
                    </a>
                )}

                {member.socials?.github && (
                    <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`GitHub de ${member.name}`}
                        className="social-icon social-icon--github"
                    >
                        <Github size={22} />
                    </a>
                )}

                {member.socials?.portfolio && (
                    <a
                        href={member.socials.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Portfólio de ${member.name}`}
                        className="social-icon social-icon--portfolio"
                    >
                        <Globe size={22} />
                    </a>
                )}
            </div>
        </div>
    );
}

export function TeamSlide() {
    const openModal = useStore((s) => s.openModal);
    const startSpeaker = useStore((s) => s.startSpeaker);
    const activeSpeakerId = useStore((s) => s.activeSpeakerId);

    return (
        <section className="team-slide">
            <h2 className="team-slide__title">Integrantes</h2>

            <div className="team-grid">
                {team.map((member) => (
                    <div
                        key={member.id}
                        className="team-card"
                        onClick={() => openModal(member.id)}
                    >
                        <img
                            src={member.photo}
                            alt={member.name}
                            className="team-card__photo"
                        />

                        <p
                            className="team-card__name"
                            title={member.name}
                        >
                            {member.name}
                        </p>

                        <p
                            className="team-card__role"
                            title={member.role}
                        >
                            {member.role}
                        </p>

                        <Button
                            className="team-card__present-btn"
                            variant={
                                activeSpeakerId === member.id
                                    ? 'green'
                                    : 'blue'
                            }
                            aria-pressed={activeSpeakerId === member.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                startSpeaker(member.id);
                            }}
                        >
                            {activeSpeakerId === member.id
                                ? 'Apresentando'
                                : 'Apresentar'}
                        </Button>
                    </div>
                ))}
            </div>

            {team.map((member) => (
                <Modal key={member.id} id={member.id}>
                    <TeamMemberModalContent memberId={member.id} />
                </Modal>
            ))}
        </section>
    );
}