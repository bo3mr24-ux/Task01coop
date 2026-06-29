using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Task01.Models;

namespace Task01.Data;

// Applies pending migrations and seeds:
//   1) the "Admin" role + one development admin user (password hashed by Identity)
//   2) default conference content matching the original React defaults,
//      so the public APIs return data on a fresh database.
public static class DbSeeder
{
    public const string AdminRole = "Admin";

    public static async Task SeedAsync(IServiceProvider services, IConfiguration config)
    {
        using var scope = services.CreateScope();
        var sp = scope.ServiceProvider;

        var db = sp.GetRequiredService<ApplicationDbContext>();
        await db.Database.MigrateAsync();

        await SeedAdminAsync(sp, config);
        await SeedContentAsync(db);
    }

    private static async Task SeedAdminAsync(IServiceProvider sp, IConfiguration config)
    {
        var roleManager = sp.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = sp.GetRequiredService<UserManager<IdentityUser>>();

        if (!await roleManager.RoleExistsAsync(AdminRole))
            await roleManager.CreateAsync(new IdentityRole(AdminRole));

        var email = config["SeedAdmin:Email"] ?? "admin@conference.com";
        var password = config["SeedAdmin:Password"] ?? "Admin@12345";

        var admin = await userManager.FindByEmailAsync(email);
        if (admin is null)
        {
            admin = new IdentityUser
            {
                UserName = email,
                Email = email,
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(admin, password);
            if (!result.Succeeded)
            {
                var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                throw new Exception($"Failed to create seed admin: {errors}");
            }
        }

        if (!await userManager.IsInRoleAsync(admin, AdminRole))
            await userManager.AddToRoleAsync(admin, AdminRole);
    }

    private static async Task SeedContentAsync(ApplicationDbContext db)
    {
        if (!await db.ConferenceSettings.AnyAsync())
        {
            db.ConferenceSettings.Add(new ConferenceSettings
            {
                ConferenceStartDate = "2026-02-04",
                ConferenceStartTime = "07:00",
                ConferenceEndDate = "2026-02-05",
                ConferenceEndTime = "19:00",
                UpdatedAt = DateTime.UtcNow
            });
        }

        if (!await db.AboutConferences.AnyAsync())
        {
            db.AboutConferences.Add(new AboutConference
            {
                ContentAr =
                    "يُعد المؤتمر الإقليمي الأول للري والصرف الزراعي بالشرق الأوسط منصةً علميةً ومهنيةً رائدةً تجمع نخبةً من الخبراء والمختصين وصنّاع القرار من مختلف دول المنطقة، بهدف مناقشة التحديات المتزايدة التي تواجه قطاع المياه والري، واستعراض أحدث الحلول والتقنيات المستدامة في مجال الإدارة المتكاملة للموارد المائية.",
                UpdatedAt = DateTime.UtcNow
            });
        }

        if (!await db.AgendaItems.AnyAsync())
        {
            var day1 = new[]
            {
                "التسجيل", "الافتتاح",
                "مواجهة مخاطر المناخ وتخفيف آثارها على موارد المياه",
                "استراتيجيات فعالة لإعادة استخدام المياه المعالجة وحوكمتها",
                "ابتكارات رائدة في تقنيات الري نحو استدامة الموارد المائية",
                "استراتيجيات الحوكمة الفعالة لتمويل قطاع الري رؤى للمستقبل",
            };
            var day2 = new[]
            {
                "التسجيل", "الجلسة الأولى", "الجلسة الثانية", "جلسة نقاش", "التوصيات الختامية",
            };

            for (int i = 0; i < day1.Length; i++)
                db.AgendaItems.Add(new AgendaItem { DayNumber = 1, Title = day1[i], Order = i });
            for (int i = 0; i < day2.Length; i++)
                db.AgendaItems.Add(new AgendaItem { DayNumber = 2, Title = day2[i], Order = i });
        }

        if (!await db.Speakers.AnyAsync())
        {
            var speakers = new (string Name, string Title)[]
            {
                ("محمد", "خبير الموارد المائية"),
                ("عمر", "استشاري تقنيات الري الحديثة"),
                ("د. خالد", "مهندس"),
                ("متحدث", "مدير مشاريع"),
                ("عبدالله", "مهندس"),
                ("سعد", "مهندس"),
            };
            for (int i = 0; i < speakers.Length; i++)
                db.Speakers.Add(new Speaker { Name = speakers[i].Name, Title = speakers[i].Title, Order = i });
        }

        if (!await db.ConferenceObjectives.AnyAsync())
        {
            var objectives = new (string Title, string Description)[]
            {
                ("حلول مستدامة",
                    "حلول مستدامة لإدارة الموارد المائية المتاحة وتعظيم الاستفادة من المصادر المتجددة لمواجهة زيادة الطلب على المياه في القطاع الزراعي."),
                ("تعزيز التقنيات الحديثة",
                    "تعزيز الاعتماد على نظم الري الحديثة والتقنيات الذكية لمواجهة التحديات المائية بأساليب مبتكرة."),
                ("توفير منصة",
                    "توفير منصة للمهنيين بالري والصرف والتوعية لتبادل الخبرات والمعرفة وخلق الشراكات."),
                ("حلول لمواجهة آثار المناخ",
                    "تقديم حلول لمواجهة آثار تغير المناخ ومدى تأثيره على الموارد المائية واستدامة المياه في قطاع الري."),
                ("إدارة مياه الري والصرف",
                    "دعم وتنفيذ سياسات الإدارة المتكاملة لمياه الري وتحسين الطلب والاستهلاك وتحقيق التنمية الاقتصادية والاجتماعية والبيئية."),
            };
            for (int i = 0; i < objectives.Length; i++)
                db.ConferenceObjectives.Add(new ConferenceObjective
                {
                    Title = objectives[i].Title,
                    Description = objectives[i].Description,
                    Order = i,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                });
        }

        await db.SaveChangesAsync();
    }
}
